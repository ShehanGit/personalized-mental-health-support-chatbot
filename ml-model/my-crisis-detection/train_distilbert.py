# train_distilbert.py

import os
import pandas as pd
from sklearn.model_selection import train_test_split
from datasets import Dataset, DatasetDict
from transformers import DistilBertTokenizerFast, DistilBertForSequenceClassification, Trainer, TrainingArguments
import torch
import numpy as np
from sklearn.metrics import accuracy_score, precision_recall_fscore_support

# 1. Hyperparameters
MAX_LENGTH = 128
BATCH_SIZE = 16
EPOCHS = 3
MODEL_NAME = "distilbert-base-uncased"  # Pretrained checkpoint
OUTPUT_DIR = "./distilbert-crisis-model"

# 2. Load the data from a single CSV or Excel file and split into train/validation/test sets
DATA_PATH = "crisis_detection_dataset.xlsx"  # Update this path to your dataset file

def load_and_split_data(file_path, test_size=0.2, valid_size=0.1, random_state=42):
    # Determine file extension and load accordingly
    if file_path.endswith('.csv'):
        df = pd.read_csv(file_path)
    elif file_path.endswith('.xlsx'):
        df = pd.read_excel(file_path)
    else:
        raise ValueError("Unsupported file format for " + file_path)
    
    # Simple cleaning: ensure text column is string and strip whitespace
    df['text'] = df['text'].astype(str).str.strip()

    # Split off test set first
    train_valid_df, test_df = train_test_split(
        df, test_size=test_size, random_state=random_state, stratify=df['label']
    )
    # Then split train_valid into training and validation sets
    valid_relative_size = valid_size / (1 - test_size)
    train_df, valid_df = train_test_split(
        train_valid_df, test_size=valid_relative_size, random_state=random_state, stratify=train_valid_df['label']
    )
    return train_df, valid_df, test_df

train_df, valid_df, test_df = load_and_split_data(DATA_PATH)

# 3. Convert DataFrames to Hugging Face Datasets
def df_to_dataset(dataframe, text_col="text", label_col="label"):
    return Dataset.from_pandas(dataframe[[text_col, label_col]])

train_ds = df_to_dataset(train_df)
valid_ds = df_to_dataset(valid_df)
test_ds = df_to_dataset(test_df)

raw_datasets = DatasetDict({
    "train": train_ds,
    "validation": valid_ds,
    "test": test_ds
})

# 4. Tokenize the dataset
tokenizer = DistilBertTokenizerFast.from_pretrained(MODEL_NAME)

def tokenize_fn(example):
    return tokenizer(example["text"], truncation=True, padding="max_length", max_length=MAX_LENGTH)

tokenized_datasets = raw_datasets.map(tokenize_fn, batched=True)
tokenized_datasets.set_format("torch", columns=["input_ids", "attention_mask", "label"])

# 5. Compute Evaluation Metrics
def compute_metrics(eval_pred):
    logits, labels = eval_pred
    preds = np.argmax(logits, axis=-1)
    acc = accuracy_score(labels, preds)
    precision, recall, f1, _ = precision_recall_fscore_support(labels, preds, average="binary")
    return {"accuracy": acc, "precision": precision, "recall": recall, "f1": f1}

# 6. Training Arguments
training_args = TrainingArguments(
    output_dir=OUTPUT_DIR,
    evaluation_strategy="epoch",
    save_strategy="epoch",
    num_train_epochs=EPOCHS,
    per_device_train_batch_size=BATCH_SIZE,
    per_device_eval_batch_size=BATCH_SIZE,
    logging_steps=50,
    load_best_model_at_end=True,
    metric_for_best_model="f1",
    greater_is_better=True,
)

# 7. Create Trainer
model = DistilBertForSequenceClassification.from_pretrained(MODEL_NAME, num_labels=2)
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_datasets["train"],
    eval_dataset=tokenized_datasets["validation"],
    tokenizer=tokenizer,
    compute_metrics=compute_metrics,
)

# 8. Train the model
trainer.train()

# 9. Evaluate on the test set
test_results = trainer.evaluate(tokenized_datasets["test"])
print("Test set results:", test_results)

# 10. Save the model
trainer.save_model(OUTPUT_DIR)
