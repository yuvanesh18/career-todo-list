# AWS Certified Machine Learning Engineer - Associate (MLA-C02)
## Master Study Plan & Comprehensive Revision Guide (Goal: 1000 / 1000)

> **Exam Code:** MLA-C02  
> **Target Score:** 1000 / 1000 (Minimum Passing: 720 / 1000)  
> **Format:** 65 Questions (50 scored, 15 unscored) | 130 Minutes  
> **Question Types:** Multiple choice (single answer) & Multiple response (select all that apply)  
> **Official Exam Scope:** Generative AI, Foundation Models (Amazon Bedrock), Traditional ML (Amazon SageMaker AI), MLOps, Data Engineering, and Security.

---

## 1. Exam Blueprint & Domain Weightings

| Domain | Focus Area | Exam Weight | Key Focus Technologies |
| :--- | :--- | :---: | :--- |
| **Domain 1** | **Data Preparation for ML and AI** | **28%** | Amazon S3, AWS Glue, DataBrew, Kinesis, Vector DBs (OpenSearch, pgvector), SageMaker Feature Store, Document Chunking for RAG, Clarify Bias Detection |
| **Domain 2** | **ML Model and Foundation Model (FM) Development** | **24%** | Amazon Bedrock (Claude, Titan, Llama, Mistral), SageMaker Built-in Algorithms, Script Mode, Hyperparameter Tuning (AMT), Distributed Training, NLP Metrics (ROUGE, BLEU, BERTScore), LLM-as-a-Judge |
| **Domain 3** | **Deployment & Orchestration of ML and AI Workflows** | **24%** | SageMaker Endpoints (Real-Time, Serverless, Async, Batch Transform), Bedrock Agents & Action Groups, Bedrock Knowledge Bases, SageMaker Pipelines, CI/CD (CodePipeline), Shadow Testing |
| **Domain 4** | **Operating, Monitoring, and Securing ML and AI Solutions** | **24%** | SageMaker Model Monitor (Data, Model, Bias, Feature Attribution), CloudWatch GenAI Observability, Bedrock Guardrails, Cost Optimization (Spot, Inf2/Trn1), VPC PrivateLink, IAM Least Privilege |

---

## 2. Official AWS Service Names & Standard Abbreviations

AWS reduces the reading load by using official short names. Memorize this exact mapping:

| Official Short Name | Full AWS Service Name | Primary Exam Role in ML/AI |
| :--- | :--- | :--- |
| **AWS CDK** | AWS Cloud Development Kit | Define ML/AI infrastructure in code (Python/TypeScript). |
| **AWS CLI** | AWS Command Line Interface | Scripting deployments and data uploads. |
| **AWS DMS** | AWS Database Migration Service | Ingesting database records into S3 data lakes for ML training. |
| **Amazon DocumentDB** | Amazon DocumentDB (with MongoDB compatibility) | JSON document store; source for semi-structured text data. |
| **Amazon EBS** | Amazon Elastic Block Store | High-performance block storage attached to EC2/SageMaker notebook instances. |
| **Amazon EC2** | Amazon Elastic Compute Cloud | Compute instances (G5, P4de, Inf2, Trn1) for custom training and hosting. |
| **Amazon ECR** | Amazon Elastic Container Registry | Store custom training and inference Docker images (DLCs). |
| **Amazon ECS** | Amazon Elastic Container Service | Container orchestration for lightweight inference microservices. |
| **Amazon EFS** | Amazon Elastic File System | POSIX shared file system for fast training data loading across distributed nodes. |
| **Amazon EKS** | Amazon Elastic Kubernetes Service | Kubernetes orchestration for large-scale enterprise ML pipelines (Kubeflow). |
| **IAM** | AWS Identity and Access Management | Role-based least-privilege access for SageMaker, Bedrock, and Lambda execution. |
| **Amazon Keyspaces** | Amazon Keyspaces (for Apache Cassandra) | Scalable managed NoSQL store for wide-column feature storage. |
| **AWS KMS** | AWS Key Management Service | Envelope encryption for S3 datasets, EBS volumes, and model artifacts. |
| **AWS Managed Microsoft AD** | AWS Directory Service for Microsoft Active Directory | Enterprise SSO identity for SageMaker Studio domains. |
| **AWS Private CA** | AWS Private Certificate Authority | Mutual TLS (mTLS) certificate issuance for secure internal model endpoints. |
| **Amazon RDS** | Amazon Relational Database Service | Relational storage; RDS PostgreSQL with `pgvector` for vector similarity search. |
| **Amazon S3** | Amazon Simple Storage Service | Primary data lake, model artifact repository, training data source. |
| **AWS SAM** | AWS Serverless Application Model | Deploy serverless inference architectures (Lambda + API Gateway). |
| **AWS SCT** | AWS Schema Conversion Tool | Migrate legacy ML data warehouse schemas to Amazon Redshift. |
| **Amazon SES** | Amazon Simple Email Service | Automated notification service for training failure and drift alerts. |
| **Amazon SNS** | Amazon Simple Notification Service | Push notifications to human engineers when Model Monitor alarms trigger. |
| **Amazon SQS** | Amazon Simple Queue Service | Decouple async inference requests and buffer ingestion pipelines. |
| **AWS STS** | AWS Security Token Service | Generate temporary, short-lived credentials for cross-account Bedrock/SageMaker access. |
| **Amazon VPC** | Amazon Virtual Private Cloud | Private, isolated networking without internet traversal via VPC Endpoints (PrivateLink). |

---

## 3. Detailed Domain Syllabus & 1000/1000 High-Yield Notes

---

### DOMAIN 1: Data Preparation for ML and AI (28%)

#### 1.1 Ingestion & Storage Architecture
- **Amazon S3 Storage Tiers for ML:** 
  - *Standard:* Active training data.
  - *Intelligent-Tiering:* Automatic cost optimization for datasets with unpredictable access patterns.
  - *Glacier Instant Retrieval:* Archive raw historical training runs with milliseconds retrieval.
  - *Exam Tip:* Use S3 Event Notifications coupled with Amazon EventBridge or SQS to trigger automated retraining pipelines upon new data arrival.
- **EBS vs EFS vs FSx for Lustre for Model Training:**
  - *Amazon EBS:* Single instance only, fastest local IOPS for SageMaker notebook local runs.
  - *Amazon EFS:* Shared across multiple instances, POSIX compliant, good for distributed data access where data changes frequently.
  - *Amazon FSx for Lustre:* Ultra-high throughput (hundreds of GB/s), linked directly to S3. **Always choose FSx for Lustre for multi-node distributed deep learning training on massive datasets.**
- **Streaming Ingestion (Kinesis vs Firehose vs Flink vs MSK):**
  - *Amazon Kinesis Data Streams:* Real-time, custom ordering with partition keys, sub-second latency, manual scaling of shards.
  - *Amazon Data Firehose:* Near-real-time (60s buffer), zero-code delivery into S3, Redshift, OpenSearch. Ideal for streaming data ingestion into S3 training buckets.
  - *Managed Service for Apache Flink:* Stateful stream processing (sliding windows, deduplication, real-time feature extraction).
  - *Amazon MSK (Apache Kafka):* When enterprise uses open-source Kafka standards.
- **Vector Databases for Generative AI & RAG:**
  - *Amazon OpenSearch Service (Serverless):* Vector engine supporting k-NN (Hierarchical Navigable Small World - HNSW and Inverted File - IVF) algorithms. Best for enterprise-scale RAG with metadata filtering.
  - *Amazon RDS / Aurora PostgreSQL with `pgvector` extension:* Best when organization already has relational data and wants vector search in the same database without running another cluster.
  - *Amazon S3 + Bedrock Knowledge Bases:* Bedrock handles chunking, embedding generation via Amazon Titan, and indexing automatically.
- **SageMaker Feature Store:**
  - *Online Store (Amazon DynamoDB):* Sub-10ms low-latency feature lookup during real-time model inference. Automatic TTL for record expiration.
  - *Offline Store (Amazon S3):* Historical, append-only, time-travel queries via Amazon Athena for model training and point-in-time feature extraction (prevents data leakage).

#### 1.2 Data Transformation & Pre-Processing
- **AWS Data Transformation Tools:**
  - *AWS Glue ETL:* Serverless Apache Spark jobs for petabyte-scale data cleaning, joins, and Parquet conversion.
  - *AWS Glue DataBrew:* Visual, code-free data preparation tool with 250+ pre-built transformations. Best for business analysts and rapid exploratory feature engineering.
  - *Amazon EMR:* Customized Spark, Hive, Presto clusters for full control over open-source big data stacks.
  - *SageMaker Data Wrangler:* Visual tool within SageMaker Studio to import, prepare, transform, featurize, and export data directly to SageMaker Pipelines or Feature Store.
- **Feature Engineering Standards:**
  - *Normalization (Min-Max):* Bounded [0, 1]. Use for algorithms sensitive to scale (Neural Networks, KNN, SVM) where outliers are minimal.
  - *Standardization (Z-score):* Mean 0, std dev 1. Robust to outliers, ideal for linear models and logistic regression.
  - *Log Transformation:* Handles right-skewed positive data (e.g. income, transaction amounts) to stabilize variance.
  - *One-Hot Encoding:* Low cardinality categorical variables (< 10 distinct values). For high-cardinality, use target encoding or embeddings.
- **Document Preparation for RAG (Retrieval Augmented Generation):**
  - *Fixed-Size Chunking:* Simple word/token count chunking (e.g., 512 tokens with 10% overlap).
  - *Semantic Chunking:* Splits text based on natural semantic boundaries (paragraphs, sentence embeddings).
  - *Hierarchical / Parent Document Chunking:* Small chunks indexed for accurate vector retrieval; parent document or larger passage returned to the LLM for full contextual synthesis.
  - *Metadata Extraction:* Extract document title, section, timestamp, author to enable hybrid vector + metadata SQL filtering.
- **Data Privacy & PII Handling:**
  - Use Amazon Comprehend PII detection & redaction to mask or replace sensitive entities (SSN, credit card, names, phone numbers) before feeding text into embedding models or fine-tuning datasets.

#### 1.3 Data Quality & Bias Management
- **AWS Glue Data Quality:**
  - Define rules using DQDL (Data Quality Definition Language), e.g., `Completeness "customer_id" = 1.0`, `IsUnique "email"`.
- **Handling Class Imbalance:**
  - *SMOTE (Synthetic Minority Over-sampling Technique):* Generates synthetic minority samples in feature space.
  - *Random Under-sampling:* Remove majority class instances (risk of losing useful data).
  - *Focal Loss / Cost-Sensitive Learning:* Increase penalty weight for misclassifying minority class.
- **SageMaker Clarify (Pre-Training Bias):**
  - *Class Imbalance (CI):* Measures difference in proportion between sensitive facets.
  - *Difference in Positive Proportions in Labels (DPL):* Assesses if positive labels are favored towards one demographic group.
  - *Disparate Impact:* Ratio of positive outcomes between unprivileged and privileged facets. Values < 0.8 indicate adverse impact.

---

### DOMAIN 2: ML Model and Foundation Model (FM) Development (24%)

#### 2.1 Model Selection & Bedrock Foundation Models
- **Amazon Bedrock Foundation Model Ecosystem:**
  - *Anthropic Claude 3.5 Sonnet:* State-of-the-art coding, complex reasoning, multimodal analysis, and agentic workflows.
  - *Anthropic Claude 3.5 Haiku:* High speed, ultra-low latency, cost-effective for classification, summarization, and lightweight tasks.
  - *Amazon Titan Text / Multimodal:* Native AWS foundation models for cost-efficient text generation, embeddings, and image processing.
  - *Meta Llama 3 / 3.1:* Open-weights models supporting custom deployment and specialized instruction tuning.
  - *Mistral Large:* Advanced multilingual and complex reasoning tasks.
- **FM Customization Techniques:**
  - *Prompt Engineering (In-Context Learning):* Zero-shot, Few-shot, Chain-of-Thought (CoT), ReAct (Reason + Act). Zero training cost, fastest implementation.
  - *RAG (Retrieval Augmented Generation):* Dynamic knowledge retrieval from external sources. Solves hallucinations, provides citations, handles rapidly changing private data without retraining.
  - *Instruction Fine-Tuning:* Supervised fine-tuning on labeled prompt-response pairs to teach specific styles, formatting, or domain tone.
  - *PEFT / LoRA (Low-Rank Adaptation):* Freezes base model weights and trains small low-rank adapter matrices. Saves 90%+ GPU memory compared to full fine-tuning.
  - *Continuous Pre-Training:* Unsupervised training on massive domain corpora (e.g. legal, biomedical) to instill new foundational vocabulary.
- **Classical SageMaker Built-in Algorithms:**
  - *XGBoost:* Gradient boosted trees; gold standard for structured tabular regression and classification.
  - *Linear Learner:* Fast linear regression and logistic classification with built-in L1/L2 regularization.
  - *Random Cut Forest (RCF):* Unsupervised anomaly detection on streaming and tabular data.
  - *DeepAR:* Recurrent neural network for probabilistic time-series forecasting across multiple related series.
  - *BlazingText:* High-speed word2vec and text classification using GPU acceleration.
  - *Object2Vec:* Embeds pairs of heterogeneous objects (e.g., user-item pairs) for collaborative filtering recommendations.
- **Pre-Trained AWS AI Services:**
  - *Amazon Textract:* Document OCR, tables, key-value forms, and natural language query extraction.
  - *Amazon Rekognition:* Image and video label detection, facial analysis, text in image, content moderation.
  - *Amazon Comprehend:* Sentiment analysis, entity extraction, key phrase extraction, topic modeling.
  - *Amazon Transcribe & Polly:* Speech-to-text (audio to text with timestamps) and Text-to-speech (neural realistic voices).

#### 2.2 Model Training, Customization & Fine-Tuning
- **SageMaker Script Mode:**
  - Write standard PyTorch, TensorFlow, or Hugging Face code in `train.py`.
  - Pass hyperparameters and S3 data channels through environment variables (`SM_CHANNEL_TRAIN`, `SM_MODEL_DIR`).
  - Container automatically loads dependencies from `requirements.txt` inside `source_dir`.
- **Automatic Model Tuning (AMT):**
  - *Bayesian Optimization:* Constructs a probabilistic model of the objective function to select the most promising next hyperparameters (recommended default).
  - *Hyperband:* Early stops poorly performing training jobs to save compute resources.
  - *Warm Start:* Reuses knowledge from previous tuning jobs to accelerate new hyperparameter optimization runs.
- **Distributed Training on SageMaker:**
  - *SageMaker Data Parallelism (SMDDP):* Replicates model across GPUs, partitions data batches. Maximizes throughput for large batch sizes.
  - *SageMaker Model Parallelism (SMP):* Splits model layers or tensors across multiple GPUs when the model is too large to fit in a single GPU's VRAM.

#### 2.3 Evaluation, Validation & AI Metrics
- **NLP & LLM Evaluation Metrics:**
  - *BLEU (Bilingual Evaluation Understudy):* Precision-oriented n-gram overlap metric; standard for Machine Translation.
  - *ROUGE (Recall-Oriented Understudy for Gisting Evaluation):* Recall-oriented overlap metric; standard for Text Summarization (ROUGE-1, ROUGE-2, ROUGE-L longest common subsequence).
  - *BERTScore:* Computes pairwise cosine similarity between contextual token embeddings of generated and reference text. Robust to paraphrasing where n-gram overlap fails.
  - *Perplexity:* Exponentiated cross-entropy loss; measures how well a probability model predicts a sample. Lower is better.
- **LLM-as-a-Judge & Automated Bedrock Evaluation:**
  - Use Bedrock Model Evaluation to run prompt datasets through multiple FMs and evaluate on:
    - *Accuracy / Relevance*
    - *Faithfulness / Groundedness* (no hallucination)
    - *Toxicity / Harmfulness*
    - *Robustness against prompt adversarial injection*
- **RAG Evaluation Framework (The RAG Triad):**
  - *Context Relevance:* Did the vector retrieval fetch documents relevant to the query?
  - *Groundedness (Faithfulness):* Is the answer derived strictly from the retrieved context?
  - *Answer Relevance:* Does the generated response answer the user's original query?
- **Explainability (SageMaker Clarify):**
  - *SHAP (SHapley Additive exPlanations):* Game-theoretic approach to compute marginal contribution of each feature to the model prediction.
  - *Global Feature Importance:* Highlights which features drive overall model behavior.
  - *Local Feature Importance:* Explains a single individual prediction (crucial for loan approval, medical diagnosis).

---

### DOMAIN 3: Deployment & Orchestration of ML and AI Workflows (24%)

#### 3.1 SageMaker Inference Options Decision Matrix
| Endpoint Type | Best For | Scaling Behavior | Max Payload | Latency |
| :--- | :--- | :--- | :---: | :---: |
| **Real-Time Endpoint** | Consistent, low-latency online inference | Auto-scales instances based on CPU/invocations | 6 MB | Sub-100ms |
| **Serverless Inference** | Intermittent traffic, unpredictable spikes, test envs | Auto-scales from 0 to max concurrency; $0 when idle | 4 MB | ~100ms - seconds (cold starts) |
| **Asynchronous Inference** | Large payloads (up to 1 GB), long processing time (up to 1 hr), audio/video/deep learning | Auto-scales to 0 instances when queue is empty; uses S3 + SQS | 1 GB | Seconds to Minutes |
| **Batch Transform** | Offline batch scoring across massive datasets, recurring ETL | Spins up cluster, processes entire S3 dataset, shuts down | GBs/TBs | Non-interactive batch |

- **Multi-Model Endpoints (MME):**
  - Host hundreds or thousands of similar models on a shared pool of instances behind a single endpoint.
  - Models stored in an S3 bucket and loaded dynamically into instance memory upon invocation. Lowest cost for multi-tenant applications.
- **Multi-Container Endpoints (MCE):**
  - Deploy up to 15 containers on a single endpoint either in serial (Inference Pipeline: Preprocessing -> Inference -> Postprocessing) or direct invocation.

#### 3.2 Amazon Bedrock Agents & Agentic Workflows
- **Bedrock Agents Architecture:**
  - *Foundation Model:* Core reasoning engine (e.g. Claude 3.5 Sonnet).
  - *Action Groups:* Defines executable actions using OpenAPI schemas (JSON/YAML) and connects them to AWS Lambda functions.
  - *Knowledge Bases:* Injects dynamic contextual retrieval (RAG) into the agent's reasoning loop.
  - *Prompt Templates:* Configures the agent's internal orchestration instructions (Pre-processing, Orchestration, Post-processing).
  - *Memory / State Management:* Stores multi-turn session history in Amazon DynamoDB.

#### 3.3 MLOps Automation & CI/CD Pipelines
- **SageMaker Pipelines:**
  - Native Python SDK DAG (Directed Acyclic Graph) workflow engine.
  - Key step types: `ProcessingStep` (Data Wrangler / PySpark), `TrainingStep` (Estimator), `TuningStep` (AMT), `CreateModelStep`, `RegisterModelStep`, `ConditionStep` (e.g. check if model accuracy > 0.85).
- **SageMaker Model Registry:**
  - Central repository for managing model versions, metadata, metric baselines, and approval status (`PendingManualApproval`, `Approved`, `Rejected`).
  - Changing status to `Approved` can emit an EventBridge event that triggers an automated deployment pipeline in AWS CodePipeline.
- **Safe Production Deployment Strategies:**
  - *Blue/Green Deployment:* Provisions new production variant (Green) alongside existing (Blue) and switches traffic all at once.
  - *Canary Deployment:* Shifts a small percentage (e.g. 10%) of live traffic to the new variant, monitors CloudWatch alarms for 15 minutes, then shifts 100% or rolls back.
  - *Linear Traffic Shifting:* Gradually shifts traffic by fixed percentages in increments (e.g., 20% every 10 minutes).
  - *Shadow Testing:* Duplicates 100% of live production traffic to a shadow variant behind the scenes. Client receives only the production response. Verifies performance and error rates under real production load without risking customer experience.

---

### DOMAIN 4: Operating, Monitoring, and Securing ML and AI Solutions (24%)

#### 4.1 Production Monitoring & Drift Detection
- **SageMaker Model Monitor (4 Core Monitor Types):**
  - *Data Quality Monitor:* Compares real-time endpoint payload inputs against baseline schema constraints (missing values, datatype changes, range violations).
  - *Model Quality Monitor:* Merges endpoint inference outputs with ground-truth labels provided later in S3; computes drift in statistical metrics (Accuracy, Precision, Recall, F1, RMSE).
  - *Bias Drift Monitor (Clarify):* Monitors demographic fairness metrics (Disparate Impact, DPL) over time to ensure model decisions remain unbiased.
  - *Feature Attribution Drift Monitor (Clarify):* Tracks changes in SHAP feature importance rankings to detect if the model's internal reasoning logic has degraded.
- **CloudWatch Generative AI Observability:**
  - Track Bedrock invocation counts, token input/output counts, latency, and invocation errors (ThrottlingException, ValidationException).
  - Set CloudWatch Alarms to alert DevOps when 4xx/5xx rates exceed thresholds.

#### 4.2 Cost Optimization Strategies
- **Training Cost Optimization:**
  - *SageMaker Managed Spot Training:* Uses EC2 Spot instances for training, delivering up to **90% cost savings**.
  - *Critical Exam Rule:* Must configure `checkpoint_s3_uri` and model checkpointing code in training script so progress is saved when Spot instances are interrupted!
- **Specialized Silicon Instances:**
  - *AWS Trainium (`trn1`):* Purpose-built ASIC for distributed deep learning and LLM training; lowest cost-to-train.
  - *AWS Inferentia (`inf2`):* Purpose-built ASIC for high-throughput, low-latency deep learning inference; up to 50% better performance-per-dollar over GPUs.
  - *AWS Graviton (`c7g` / `m7g`):* ARM-based CPU instances offering 20% better price-performance for classical ML inference.
- **Foundation Model Cost Management:**
  - *On-Demand Pricing:* Pay per 1,000 input and output tokens. Best for variable, unpredictable workloads.
  - *Provisioned Throughput:* Commit to dedicated Model Units (MUs) for 1 or 6 months. Best for high-volume, constant workloads needing guaranteed SLA and latency.
  - *Prompt Caching:* Reuses cached prefixes across prompts to cut prompt token processing costs by up to 80%.

#### 4.3 Security, IAM, and Compliance
- **IAM Policies & Least Privilege:**
  - SageMaker Notebooks and Endpoints assume IAM Execution Roles (`sagemaker.amazonaws.com`).
  - Bedrock Agents assume execution roles (`bedrock.amazonaws.com`) with trust policies allowing invocation of associated Lambda functions and S3 buckets.
  - Restrict bucket access to endpoint execution roles using S3 Bucket Policies with `Condition: {"StringEquals": {"aws:sourceVpce": "vpce-xxxx"}}`.
- **Network Isolation & VPC Endpoints (AWS PrivateLink):**
  - Always place SageMaker Studio notebooks, training clusters, and inference endpoints inside **Private Subnets** with no internet gateway.
  - Configure Interface VPC Endpoints (`com.amazonaws.<region>.sagemaker.api` and `com.amazonaws.<region>.sagemaker.runtime`).
  - Configure Gateway VPC Endpoint for Amazon S3 (`com.amazonaws.<region>.s3`) for free, high-throughput private data access.
  - Set `EnableNetworkIsolation=True` on SageMaker Estimators to block all inbound and outbound network access during container training.
- **Amazon Bedrock Guardrails:**
  - *Content Filters:* Set filter strengths (LOW, MEDIUM, HIGH) for Hate, Insults, Sexual content, Violence, Misconduct.
  - *Denied Topics:* Define custom prompt-response restrictions with natural language descriptions (e.g., "Do not give investment advice").
  - *Word Filters:* Block specific vulgar words or competitor brand names.
  - *Sensitive Information Filters:* Detect, block, or automatically mask PII (SSN, credit card, email, address) with regex or 30+ built-in PII entities.
  - *Prompt Attack Filters:* Automatically detects and blocks prompt injection and jailbreak attempts.
- **Auditing & Governance:**
  - *AWS CloudTrail:* Logs every API call made to SageMaker (`CreateTrainingJob`, `InvokeEndpoint`) and Bedrock (`InvokeModel`) for compliance auditing.
  - *AWS Config:* Evaluates configurations against compliance rules (e.g. `sagemaker-endpoint-configuration-kms-key-configured`).
  - *Amazon Inspector:* Automatically scans custom ECR container images for software vulnerabilities and CVEs.

---

## 4. 1000/1000 Master Exam Decision Rules & Cheat Sheet

When confronted with ambiguous multiple-choice questions on the exam, use these battle-tested decision rules:

1. **"Need sub-second real-time inference with steady traffic"**  
   👉 **Choose:** SageMaker Real-Time Endpoint.
2. **"Need inference for intermittent, unpredictable requests where cost must be zero when idle"**  
   👉 **Choose:** SageMaker Serverless Inference.
3. **"Inference payload is up to 1 GB or takes 15 minutes to generate"**  
   👉 **Choose:** SageMaker Asynchronous Inference (with Amazon S3 and SQS).
4. **"Need to score millions of historical records overnight in batch"**  
   👉 **Choose:** SageMaker Batch Transform.
5. **"Need to host 500 distinct XGBoost customer models at minimal cost"**  
   👉 **Choose:** SageMaker Multi-Model Endpoint (MME) with models stored in S3.
6. **"Need to train a deep learning model at lowest cost and can tolerate interruptions"**  
   👉 **Choose:** SageMaker Managed Spot Training with S3 Checkpointing.
7. **"Need to train a 70B parameter LLM that exceeds single GPU memory"**  
   👉 **Choose:** SageMaker Model Parallelism (SMP).
8. **"Need to eliminate hallucinations and give an LLM access to internal company policy docs"**  
   👉 **Choose:** Retrieval-Augmented Generation (RAG) via Amazon Bedrock Knowledge Bases with OpenSearch Serverless.
9. **"Need an LLM to take actions, call APIs, and query databases dynamically"**  
   👉 **Choose:** Amazon Bedrock Agent with Action Groups and AWS Lambda.
10. **"Need to prevent PII leakage and block prompt injection in a customer-facing LLM application"**  
   👉 **Choose:** Amazon Bedrock Guardrails.
11. **"Need to detect if model accuracy has dropped after 3 months in production"**  
   👉 **Choose:** SageMaker Model Monitor (Model Quality Monitor matching ground truth S3 data).
12. **"Need to test a new model candidate in production with zero risk to users"**  
   👉 **Choose:** SageMaker Shadow Testing.
13. **"Need absolute network security for training and inference with no public internet route"**  
   👉 **Choose:** VPC Private Subnets + VPC Interface Endpoints (PrivateLink) + S3 Gateway Endpoint + `EnableNetworkIsolation=True`.

---

## 5. 6-Week High-Yield Study Schedule

| Week | Focus Domain | Primary Goals & Hands-on Labs | Milestone Assessment |
| :---: | :--- | :--- | :--- |
| **Week 1** | **Domain 1: Data Preparation & Vector DBs** | S3 tiers, Kinesis streams, Glue ETL, SageMaker Feature Store, Document chunking for RAG, pgvector setup | Domain 1 Practice Test (Target: 90%+) |
| **Week 2** | **Domain 2: SageMaker Classical ML & Built-in Algortihms** | XGBoost, Linear Learner, DeepAR, Clarify pre-training bias metrics, Script Mode training | Built-in Algorithms & Tuning Lab |
| **Week 3** | **Domain 2: Generative AI & Amazon Bedrock** | Bedrock FM selection, Prompt engineering, Fine-tuning vs RAG, BLEU/ROUGE/BERTScore, Bedrock Model Eval | Generative AI Assessment (Target: 95%+) |
| **Week 4** | **Domain 3: Endpoint Hosting & Inference Architectures** | Real-Time vs Serverless vs Async vs Batch, Multi-Model Endpoints, Bedrock Agents & Knowledge Bases | Deployment Architecture Matrix Lab |
| **Week 5** | **Domain 3 & 4: MLOps Pipelines & CI/CD** | SageMaker Pipelines DAG, Model Registry approval flow, EventBridge triggers, Canary & Shadow testing | End-to-End MLOps Pipeline Walkthrough |
| **Week 6** | **Domain 4: Monitoring, Security & Full Mock Exams** | Model Monitor (4 types), Bedrock Guardrails, KMS, PrivateLink, 3 Full-length 65-question timed mock exams | **Final Mock Score: 950 - 1000 / 1000** |

---

## 6. Official 107-Skill Complete Curriculum & Interactive Study Notepad

The CareerPulse application now incorporates all **107 official examination skills** from the official AWS MLA-C02 exam guide (Pages 5–12).

### Complete Breakdown of the 107 Skills:
- **Domain 1 (28%): 25 Skills**
  - *Task 1.1: Collect and store data* (Skills 1.1.1 to 1.1.9) — 9 skills
  - *Task 1.2: Perform data transformation, feature engineering, and pre-processing* (Skills 1.2.1 to 1.2.9) — 9 skills
  - *Task 1.3: Validate data quality and manage bias* (Skills 1.3.1 to 1.3.7) — 7 skills
- **Domain 2 (24%): 27 Skills**
  - *Task 2.1: Choose appropriate modeling approaches* (Skills 2.1.1 to 2.1.8) — 8 skills
  - *Task 2.2: Train, fine-tune, and customize models* (Skills 2.2.1 to 2.2.9) — 9 skills
  - *Task 2.3: Analyze and evaluate performance* (Skills 2.3.1 to 2.3.10) — 10 skills
- **Domain 3 (24%): 30 Skills**
  - *Task 3.1: Manage deployment infrastructure* (Skills 3.1.1 to 3.1.8) — 8 skills
  - *Task 3.2: Provision and configure resources* (Skills 3.2.1 to 3.2.11) — 11 skills
  - *Task 3.3: Automated orchestration & CI/CD* (Skills 3.3.1 to 3.3.11) — 11 skills
- **Domain 4 (24%): 25 Skills**
  - *Task 4.1: Monitor model inference and performance* (Skills 4.1.1 to 4.1.6) — 6 skills
  - *Task 4.2: Optimize infrastructure costs & performance* (Skills 4.2.1 to 4.2.10) — 10 skills
  - *Task 4.3: Secure ML/AI workloads & endpoints* (Skills 4.3.1 to 4.3.9) — 9 skills

### Interactive Study Notepad (Right-Side Drawer):
Clicking any task row or the **"Study Notepad 📝"** button opens a right-side study panel featuring:
1. **💡 Simplified Plain-English Explanation:** Concept breakdown with real-world analogies.
2. **📊 Architecture Flow Diagram:** ASCII visual mapping of data flows, services, and boundaries.
3. **📝 Exam Hacker Sticky Notes:** Warm yellow handwritten-styled card with Mnemonic, Exam Traps (Gotchas), and 1000/1000 Golden Rule.
4. **📌 Core Technical Bullet Points:** Service limits, CLI/SDK parameters, and real exam scenario question patterns.
5. **✏️ Personal Study Notepad:** Auto-saving interactive notepad to take custom notes for each skill.

