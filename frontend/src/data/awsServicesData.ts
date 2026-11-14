// AWS In-Scope Services Master Reference (81 Services across 14 Categories)
export interface AWSServiceItem {
  id: string;
  serviceName: string;
  category: string;
  isImportant: boolean;
  role: string;
  plainEnglish?: string;
  diagram?: string;
  handwrittenNotes?: {
    mnemonic: string;
    examTrap: string;
    goldenRule: string;
  };
  bulletPoints?: string[];
  scenarioTip?: string;
  url: string;
}

export const AWS_IN_SCOPE_SERVICES: Record<string, AWSServiceItem> = {
  "svc-athena": {
    "id": "svc-athena",
    "serviceName": "Amazon Athena",
    "category": "Analytics",
    "isImportant": true,
    "role": "Amazon Athena is an official in-scope AWS service in the Analytics category for the AWS Machine Learning Engineer - Asso...",
    "plainEnglish": "Amazon Athena is an official in-scope AWS service in the Analytics category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select Amazon Athena over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 Amazon Athena (Analytics)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon Athena: The standard AWS solution for Analytics in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when Amazon Athena offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose Amazon Athena whenever you need native, fully managed AWS capability for Analytics workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Analytics.",
      "High-Yield Status: \ud83d\udd25 Essential Core Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose Amazon Athena whenever you need native, fully managed AWS capability for Analytics workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/athena/latest/userguide/what-is.html"
  },
  "svc-data-firehose": {
    "id": "svc-data-firehose",
    "serviceName": "Amazon Data Firehose",
    "category": "Analytics",
    "isImportant": true,
    "role": "Amazon Data Firehose is an official in-scope AWS service in the Analytics category for the AWS Machine Learning Engineer...",
    "plainEnglish": "Amazon Data Firehose is an official in-scope AWS service in the Analytics category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select Amazon Data Firehose over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 Amazon Data Firehose (Analytics)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon Data Firehose: The standard AWS solution for Analytics in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when Amazon Data Firehose offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose Amazon Data Firehose whenever you need native, fully managed AWS capability for Analytics workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Analytics.",
      "High-Yield Status: \ud83d\udd25 Essential Core Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose Amazon Data Firehose whenever you need native, fully managed AWS capability for Analytics workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/data-firehose/latest/userguide/what-is.html"
  },
  "svc-emr": {
    "id": "svc-emr",
    "serviceName": "Amazon EMR",
    "category": "Analytics",
    "isImportant": false,
    "role": "Amazon EMR is an official in-scope AWS service in the Analytics category for the AWS Machine Learning Engineer - Associa...",
    "plainEnglish": "Amazon EMR is an official in-scope AWS service in the Analytics category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select Amazon EMR over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 Amazon EMR (Analytics)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon EMR: The standard AWS solution for Analytics in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when Amazon EMR offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose Amazon EMR whenever you need native, fully managed AWS capability for Analytics workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Analytics.",
      "High-Yield Status: Standard In-Scope Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose Amazon EMR whenever you need native, fully managed AWS capability for Analytics workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/emr/latest/userguide/what-is.html"
  },
  "svc-glue": {
    "id": "svc-glue",
    "serviceName": "AWS Glue",
    "category": "Analytics",
    "isImportant": true,
    "role": "AWS Glue is an official in-scope AWS service in the Analytics category for the AWS Machine Learning Engineer - Associate...",
    "plainEnglish": "AWS Glue is an official in-scope AWS service in the Analytics category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select AWS Glue over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 AWS Glue (Analytics)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "AWS Glue: The standard AWS solution for Analytics in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when AWS Glue offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose AWS Glue whenever you need native, fully managed AWS capability for Analytics workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Analytics.",
      "High-Yield Status: \ud83d\udd25 Essential Core Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose AWS Glue whenever you need native, fully managed AWS capability for Analytics workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/glue/latest/userguide/what-is.html"
  },
  "svc-glue-databrew": {
    "id": "svc-glue-databrew",
    "serviceName": "AWS Glue DataBrew",
    "category": "Analytics",
    "isImportant": true,
    "role": "AWS Glue DataBrew is an official in-scope AWS service in the Analytics category for the AWS Machine Learning Engineer - ...",
    "plainEnglish": "AWS Glue DataBrew is an official in-scope AWS service in the Analytics category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select AWS Glue DataBrew over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 AWS Glue DataBrew (Analytics)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "AWS Glue DataBrew: The standard AWS solution for Analytics in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when AWS Glue DataBrew offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose AWS Glue DataBrew whenever you need native, fully managed AWS capability for Analytics workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Analytics.",
      "High-Yield Status: \ud83d\udd25 Essential Core Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose AWS Glue DataBrew whenever you need native, fully managed AWS capability for Analytics workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/glue-databrew/latest/userguide/what-is.html"
  },
  "svc-glue-data-quality": {
    "id": "svc-glue-data-quality",
    "serviceName": "AWS Glue Data Quality",
    "category": "Analytics",
    "isImportant": false,
    "role": "AWS Glue Data Quality is an official in-scope AWS service in the Analytics category for the AWS Machine Learning Enginee...",
    "plainEnglish": "AWS Glue Data Quality is an official in-scope AWS service in the Analytics category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select AWS Glue Data Quality over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 AWS Glue Data Quality (Analytics)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "AWS Glue Data Quality: The standard AWS solution for Analytics in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when AWS Glue Data Quality offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose AWS Glue Data Quality whenever you need native, fully managed AWS capability for Analytics workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Analytics.",
      "High-Yield Status: Standard In-Scope Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose AWS Glue Data Quality whenever you need native, fully managed AWS capability for Analytics workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/glue-data-quality/latest/userguide/what-is.html"
  },
  "svc-kinesis": {
    "id": "svc-kinesis",
    "serviceName": "Amazon Kinesis",
    "category": "Analytics",
    "isImportant": true,
    "role": "Amazon Kinesis is an official in-scope AWS service in the Analytics category for the AWS Machine Learning Engineer - Ass...",
    "plainEnglish": "Amazon Kinesis is an official in-scope AWS service in the Analytics category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select Amazon Kinesis over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 Amazon Kinesis (Analytics)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon Kinesis: The standard AWS solution for Analytics in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when Amazon Kinesis offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose Amazon Kinesis whenever you need native, fully managed AWS capability for Analytics workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Analytics.",
      "High-Yield Status: \ud83d\udd25 Essential Core Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose Amazon Kinesis whenever you need native, fully managed AWS capability for Analytics workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/kinesis/latest/userguide/what-is.html"
  },
  "svc-lake-formation": {
    "id": "svc-lake-formation",
    "serviceName": "AWS Lake Formation",
    "category": "Analytics",
    "isImportant": false,
    "role": "AWS Lake Formation is an official in-scope AWS service in the Analytics category for the AWS Machine Learning Engineer -...",
    "plainEnglish": "AWS Lake Formation is an official in-scope AWS service in the Analytics category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select AWS Lake Formation over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 AWS Lake Formation (Analytics)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "AWS Lake Formation: The standard AWS solution for Analytics in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when AWS Lake Formation offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose AWS Lake Formation whenever you need native, fully managed AWS capability for Analytics workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Analytics.",
      "High-Yield Status: Standard In-Scope Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose AWS Lake Formation whenever you need native, fully managed AWS capability for Analytics workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/lake-formation/latest/userguide/what-is.html"
  },
  "svc-flink": {
    "id": "svc-flink",
    "serviceName": "Amazon Managed Service for Apache Flink",
    "category": "Analytics",
    "isImportant": false,
    "role": "Amazon Managed Service for Apache Flink is an official in-scope AWS service in the Analytics category for the AWS Machin...",
    "plainEnglish": "Amazon Managed Service for Apache Flink is an official in-scope AWS service in the Analytics category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select Amazon Managed Service for Apache Flink over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 Amazon Managed Service for Apache Flink (Analytics)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon Managed Service for Apache Flink: The standard AWS solution for Analytics in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when Amazon Managed Service for Apache Flink offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose Amazon Managed Service for Apache Flink whenever you need native, fully managed AWS capability for Analytics workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Analytics.",
      "High-Yield Status: Standard In-Scope Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose Amazon Managed Service for Apache Flink whenever you need native, fully managed AWS capability for Analytics workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/flink/latest/userguide/what-is.html"
  },
  "svc-opensearch": {
    "id": "svc-opensearch",
    "serviceName": "Amazon OpenSearch Service",
    "category": "Analytics",
    "isImportant": true,
    "role": "Amazon OpenSearch Service is an official in-scope AWS service in the Analytics category for the AWS Machine Learning Eng...",
    "plainEnglish": "Amazon OpenSearch Service is an official in-scope AWS service in the Analytics category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select Amazon OpenSearch Service over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 Amazon OpenSearch Service (Analytics)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon OpenSearch Service: The standard AWS solution for Analytics in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when Amazon OpenSearch Service offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose Amazon OpenSearch Service whenever you need native, fully managed AWS capability for Analytics workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Analytics.",
      "High-Yield Status: \ud83d\udd25 Essential Core Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose Amazon OpenSearch Service whenever you need native, fully managed AWS capability for Analytics workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/opensearch/latest/userguide/what-is.html"
  },
  "svc-quicksight": {
    "id": "svc-quicksight",
    "serviceName": "Amazon QuickSight",
    "category": "Analytics",
    "isImportant": false,
    "role": "Amazon QuickSight is an official in-scope AWS service in the Analytics category for the AWS Machine Learning Engineer - ...",
    "plainEnglish": "Amazon QuickSight is an official in-scope AWS service in the Analytics category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select Amazon QuickSight over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 Amazon QuickSight (Analytics)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon QuickSight: The standard AWS solution for Analytics in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when Amazon QuickSight offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose Amazon QuickSight whenever you need native, fully managed AWS capability for Analytics workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Analytics.",
      "High-Yield Status: Standard In-Scope Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose Amazon QuickSight whenever you need native, fully managed AWS capability for Analytics workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/quicksight/latest/userguide/what-is.html"
  },
  "svc-redshift": {
    "id": "svc-redshift",
    "serviceName": "Amazon Redshift",
    "category": "Analytics",
    "isImportant": false,
    "role": "Amazon Redshift is an official in-scope AWS service in the Analytics category for the AWS Machine Learning Engineer - As...",
    "plainEnglish": "Amazon Redshift is an official in-scope AWS service in the Analytics category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select Amazon Redshift over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 Amazon Redshift (Analytics)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon Redshift: The standard AWS solution for Analytics in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when Amazon Redshift offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose Amazon Redshift whenever you need native, fully managed AWS capability for Analytics workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Analytics.",
      "High-Yield Status: Standard In-Scope Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose Amazon Redshift whenever you need native, fully managed AWS capability for Analytics workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/redshift/latest/userguide/what-is.html"
  },
  "svc-eventbridge": {
    "id": "svc-eventbridge",
    "serviceName": "Amazon EventBridge",
    "category": "Application Integration",
    "isImportant": true,
    "role": "Amazon EventBridge is an official in-scope AWS service in the Application Integration category for the AWS Machine Learn...",
    "plainEnglish": "Amazon EventBridge is an official in-scope AWS service in the Application Integration category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select Amazon EventBridge over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 Amazon EventBridge (Application Integration)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon EventBridge: The standard AWS solution for Application Integration in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when Amazon EventBridge offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose Amazon EventBridge whenever you need native, fully managed AWS capability for Application Integration workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Application Integration.",
      "High-Yield Status: \ud83d\udd25 Essential Core Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose Amazon EventBridge whenever you need native, fully managed AWS capability for Application Integration workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/eventbridge/latest/userguide/what-is.html"
  },
  "svc-mwaa": {
    "id": "svc-mwaa",
    "serviceName": "Amazon Managed Workflows for Apache Airflow (Amazon MWAA)",
    "category": "Application Integration",
    "isImportant": false,
    "role": "Amazon Managed Workflows for Apache Airflow (Amazon MWAA) is an official in-scope AWS service in the Application Integra...",
    "plainEnglish": "Amazon Managed Workflows for Apache Airflow (Amazon MWAA) is an official in-scope AWS service in the Application Integration category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select Amazon Managed Workflows for Apache Airflow (Amazon MWAA) over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 Amazon Managed Workflows for Apache Airflow (Amazon MWAA) (Application Integration)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon Managed Workflows for Apache Airflow (Amazon MWAA): The standard AWS solution for Application Integration in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when Amazon Managed Workflows for Apache Airflow (Amazon MWAA) offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose Amazon Managed Workflows for Apache Airflow (Amazon MWAA) whenever you need native, fully managed AWS capability for Application Integration workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Application Integration.",
      "High-Yield Status: Standard In-Scope Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose Amazon Managed Workflows for Apache Airflow (Amazon MWAA) whenever you need native, fully managed AWS capability for Application Integration workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/mwaa/latest/userguide/what-is.html"
  },
  "svc-sns": {
    "id": "svc-sns",
    "serviceName": "Amazon SNS",
    "category": "Application Integration",
    "isImportant": true,
    "role": "Amazon SNS is an official in-scope AWS service in the Application Integration category for the AWS Machine Learning Engi...",
    "plainEnglish": "Amazon SNS is an official in-scope AWS service in the Application Integration category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select Amazon SNS over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 Amazon SNS (Application Integration)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon SNS: The standard AWS solution for Application Integration in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when Amazon SNS offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose Amazon SNS whenever you need native, fully managed AWS capability for Application Integration workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Application Integration.",
      "High-Yield Status: \ud83d\udd25 Essential Core Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose Amazon SNS whenever you need native, fully managed AWS capability for Application Integration workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/sns/latest/userguide/what-is.html"
  },
  "svc-sqs": {
    "id": "svc-sqs",
    "serviceName": "Amazon SQS",
    "category": "Application Integration",
    "isImportant": true,
    "role": "Amazon SQS is an official in-scope AWS service in the Application Integration category for the AWS Machine Learning Engi...",
    "plainEnglish": "Amazon SQS is an official in-scope AWS service in the Application Integration category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select Amazon SQS over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 Amazon SQS (Application Integration)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon SQS: The standard AWS solution for Application Integration in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when Amazon SQS offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose Amazon SQS whenever you need native, fully managed AWS capability for Application Integration workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Application Integration.",
      "High-Yield Status: \ud83d\udd25 Essential Core Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose Amazon SQS whenever you need native, fully managed AWS capability for Application Integration workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/sqs/latest/userguide/what-is.html"
  },
  "svc-step-functions": {
    "id": "svc-step-functions",
    "serviceName": "AWS Step Functions",
    "category": "Application Integration",
    "isImportant": true,
    "role": "AWS Step Functions is an official in-scope AWS service in the Application Integration category for the AWS Machine Learn...",
    "plainEnglish": "AWS Step Functions is an official in-scope AWS service in the Application Integration category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select AWS Step Functions over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 AWS Step Functions (Application Integration)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "AWS Step Functions: The standard AWS solution for Application Integration in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when AWS Step Functions offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose AWS Step Functions whenever you need native, fully managed AWS capability for Application Integration workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Application Integration.",
      "High-Yield Status: \ud83d\udd25 Essential Core Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose AWS Step Functions whenever you need native, fully managed AWS capability for Application Integration workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/step-functions/latest/userguide/what-is.html"
  },
  "svc-billing-cost-management": {
    "id": "svc-billing-cost-management",
    "serviceName": "AWS Billing and Cost Management",
    "category": "Cloud Financial Management",
    "isImportant": false,
    "role": "AWS Billing and Cost Management is an official in-scope AWS service in the Cloud Financial Management category for the A...",
    "plainEnglish": "AWS Billing and Cost Management is an official in-scope AWS service in the Cloud Financial Management category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select AWS Billing and Cost Management over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 AWS Billing and Cost Management (Cloud Financial Management)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "AWS Billing and Cost Management: The standard AWS solution for Cloud Financial Management in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when AWS Billing and Cost Management offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose AWS Billing and Cost Management whenever you need native, fully managed AWS capability for Cloud Financial Management workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Cloud Financial Management.",
      "High-Yield Status: Standard In-Scope Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose AWS Billing and Cost Management whenever you need native, fully managed AWS capability for Cloud Financial Management workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/billing-cost-management/latest/userguide/what-is.html"
  },
  "svc-budgets": {
    "id": "svc-budgets",
    "serviceName": "AWS Budgets",
    "category": "Cloud Financial Management",
    "isImportant": false,
    "role": "AWS Budgets is an official in-scope AWS service in the Cloud Financial Management category for the AWS Machine Learning ...",
    "plainEnglish": "AWS Budgets is an official in-scope AWS service in the Cloud Financial Management category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select AWS Budgets over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 AWS Budgets (Cloud Financial Management)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "AWS Budgets: The standard AWS solution for Cloud Financial Management in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when AWS Budgets offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose AWS Budgets whenever you need native, fully managed AWS capability for Cloud Financial Management workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Cloud Financial Management.",
      "High-Yield Status: Standard In-Scope Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose AWS Budgets whenever you need native, fully managed AWS capability for Cloud Financial Management workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/budgets/latest/userguide/what-is.html"
  },
  "svc-cost-explorer": {
    "id": "svc-cost-explorer",
    "serviceName": "AWS Cost Explorer",
    "category": "Cloud Financial Management",
    "isImportant": true,
    "role": "AWS Cost Explorer is an official in-scope AWS service in the Cloud Financial Management category for the AWS Machine Lea...",
    "plainEnglish": "AWS Cost Explorer is an official in-scope AWS service in the Cloud Financial Management category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select AWS Cost Explorer over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 AWS Cost Explorer (Cloud Financial Management)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "AWS Cost Explorer: The standard AWS solution for Cloud Financial Management in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when AWS Cost Explorer offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose AWS Cost Explorer whenever you need native, fully managed AWS capability for Cloud Financial Management workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Cloud Financial Management.",
      "High-Yield Status: \ud83d\udd25 Essential Core Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose AWS Cost Explorer whenever you need native, fully managed AWS capability for Cloud Financial Management workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/cost-explorer/latest/userguide/what-is.html"
  },
  "svc-batch": {
    "id": "svc-batch",
    "serviceName": "AWS Batch",
    "category": "Compute",
    "isImportant": false,
    "role": "AWS Batch is an official in-scope AWS service in the Compute category for the AWS Machine Learning Engineer - Associate ...",
    "plainEnglish": "AWS Batch is an official in-scope AWS service in the Compute category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select AWS Batch over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 AWS Batch (Compute)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "AWS Batch: The standard AWS solution for Compute in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when AWS Batch offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose AWS Batch whenever you need native, fully managed AWS capability for Compute workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Compute.",
      "High-Yield Status: Standard In-Scope Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose AWS Batch whenever you need native, fully managed AWS capability for Compute workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/batch/latest/userguide/what-is.html"
  },
  "svc-ec2": {
    "id": "svc-ec2",
    "serviceName": "Amazon EC2",
    "category": "Compute",
    "isImportant": true,
    "role": "Amazon EC2 is an official in-scope AWS service in the Compute category for the AWS Machine Learning Engineer - Associate...",
    "plainEnglish": "Amazon EC2 is an official in-scope AWS service in the Compute category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select Amazon EC2 over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 Amazon EC2 (Compute)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon EC2: The standard AWS solution for Compute in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when Amazon EC2 offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose Amazon EC2 whenever you need native, fully managed AWS capability for Compute workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Compute.",
      "High-Yield Status: \ud83d\udd25 Essential Core Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose Amazon EC2 whenever you need native, fully managed AWS capability for Compute workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/ec2/latest/userguide/what-is.html"
  },
  "svc-lambda": {
    "id": "svc-lambda",
    "serviceName": "AWS Lambda",
    "category": "Compute",
    "isImportant": true,
    "role": "AWS Lambda is an official in-scope AWS service in the Compute category for the AWS Machine Learning Engineer - Associate...",
    "plainEnglish": "AWS Lambda is an official in-scope AWS service in the Compute category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select AWS Lambda over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 AWS Lambda (Compute)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "AWS Lambda: The standard AWS solution for Compute in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when AWS Lambda offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose AWS Lambda whenever you need native, fully managed AWS capability for Compute workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Compute.",
      "High-Yield Status: \ud83d\udd25 Essential Core Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose AWS Lambda whenever you need native, fully managed AWS capability for Compute workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/lambda/latest/userguide/what-is.html"
  },
  "svc-ecr": {
    "id": "svc-ecr",
    "serviceName": "Amazon ECR",
    "category": "Containers",
    "isImportant": true,
    "role": "Amazon ECR is an official in-scope AWS service in the Containers category for the AWS Machine Learning Engineer - Associ...",
    "plainEnglish": "Amazon ECR is an official in-scope AWS service in the Containers category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select Amazon ECR over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 Amazon ECR (Containers)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon ECR: The standard AWS solution for Containers in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when Amazon ECR offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose Amazon ECR whenever you need native, fully managed AWS capability for Containers workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Containers.",
      "High-Yield Status: \ud83d\udd25 Essential Core Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose Amazon ECR whenever you need native, fully managed AWS capability for Containers workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/ecr/latest/userguide/what-is.html"
  },
  "svc-ecs": {
    "id": "svc-ecs",
    "serviceName": "Amazon ECS",
    "category": "Containers",
    "isImportant": false,
    "role": "Amazon ECS is an official in-scope AWS service in the Containers category for the AWS Machine Learning Engineer - Associ...",
    "plainEnglish": "Amazon ECS is an official in-scope AWS service in the Containers category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select Amazon ECS over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 Amazon ECS (Containers)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon ECS: The standard AWS solution for Containers in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when Amazon ECS offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose Amazon ECS whenever you need native, fully managed AWS capability for Containers workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Containers.",
      "High-Yield Status: Standard In-Scope Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose Amazon ECS whenever you need native, fully managed AWS capability for Containers workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/ecs/latest/userguide/what-is.html"
  },
  "svc-eks": {
    "id": "svc-eks",
    "serviceName": "Amazon EKS",
    "category": "Containers",
    "isImportant": false,
    "role": "Amazon EKS is an official in-scope AWS service in the Containers category for the AWS Machine Learning Engineer - Associ...",
    "plainEnglish": "Amazon EKS is an official in-scope AWS service in the Containers category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select Amazon EKS over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 Amazon EKS (Containers)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon EKS: The standard AWS solution for Containers in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when Amazon EKS offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose Amazon EKS whenever you need native, fully managed AWS capability for Containers workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Containers.",
      "High-Yield Status: Standard In-Scope Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose Amazon EKS whenever you need native, fully managed AWS capability for Containers workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/eks/latest/userguide/what-is.html"
  },
  "svc-documentdb": {
    "id": "svc-documentdb",
    "serviceName": "Amazon DocumentDB",
    "category": "Database",
    "isImportant": false,
    "role": "Amazon DocumentDB is an official in-scope AWS service in the Database category for the AWS Machine Learning Engineer - A...",
    "plainEnglish": "Amazon DocumentDB is an official in-scope AWS service in the Database category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select Amazon DocumentDB over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 Amazon DocumentDB (Database)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon DocumentDB: The standard AWS solution for Database in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when Amazon DocumentDB offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose Amazon DocumentDB whenever you need native, fully managed AWS capability for Database workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Database.",
      "High-Yield Status: Standard In-Scope Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose Amazon DocumentDB whenever you need native, fully managed AWS capability for Database workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/documentdb/latest/userguide/what-is.html"
  },
  "svc-dynamodb": {
    "id": "svc-dynamodb",
    "serviceName": "Amazon DynamoDB",
    "category": "Database",
    "isImportant": true,
    "role": "Amazon DynamoDB is an official in-scope AWS service in the Database category for the AWS Machine Learning Engineer - Ass...",
    "plainEnglish": "Amazon DynamoDB is an official in-scope AWS service in the Database category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select Amazon DynamoDB over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 Amazon DynamoDB (Database)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon DynamoDB: The standard AWS solution for Database in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when Amazon DynamoDB offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose Amazon DynamoDB whenever you need native, fully managed AWS capability for Database workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Database.",
      "High-Yield Status: \ud83d\udd25 Essential Core Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose Amazon DynamoDB whenever you need native, fully managed AWS capability for Database workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/dynamodb/latest/userguide/what-is.html"
  },
  "svc-elasticache": {
    "id": "svc-elasticache",
    "serviceName": "Amazon ElastiCache",
    "category": "Database",
    "isImportant": false,
    "role": "Amazon ElastiCache is an official in-scope AWS service in the Database category for the AWS Machine Learning Engineer - ...",
    "plainEnglish": "Amazon ElastiCache is an official in-scope AWS service in the Database category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select Amazon ElastiCache over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 Amazon ElastiCache (Database)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon ElastiCache: The standard AWS solution for Database in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when Amazon ElastiCache offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose Amazon ElastiCache whenever you need native, fully managed AWS capability for Database workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Database.",
      "High-Yield Status: Standard In-Scope Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose Amazon ElastiCache whenever you need native, fully managed AWS capability for Database workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/elasticache/latest/userguide/what-is.html"
  },
  "svc-neptune": {
    "id": "svc-neptune",
    "serviceName": "Amazon Neptune",
    "category": "Database",
    "isImportant": false,
    "role": "Amazon Neptune is an official in-scope AWS service in the Database category for the AWS Machine Learning Engineer - Asso...",
    "plainEnglish": "Amazon Neptune is an official in-scope AWS service in the Database category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select Amazon Neptune over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 Amazon Neptune (Database)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon Neptune: The standard AWS solution for Database in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when Amazon Neptune offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose Amazon Neptune whenever you need native, fully managed AWS capability for Database workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Database.",
      "High-Yield Status: Standard In-Scope Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose Amazon Neptune whenever you need native, fully managed AWS capability for Database workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/neptune/latest/userguide/what-is.html"
  },
  "svc-rds": {
    "id": "svc-rds",
    "serviceName": "Amazon RDS",
    "category": "Database",
    "isImportant": true,
    "role": "Amazon RDS is an official in-scope AWS service in the Database category for the AWS Machine Learning Engineer - Associat...",
    "plainEnglish": "Amazon RDS is an official in-scope AWS service in the Database category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select Amazon RDS over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 Amazon RDS (Database)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon RDS: The standard AWS solution for Database in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when Amazon RDS offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose Amazon RDS whenever you need native, fully managed AWS capability for Database workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Database.",
      "High-Yield Status: \ud83d\udd25 Essential Core Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose Amazon RDS whenever you need native, fully managed AWS capability for Database workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/rds/latest/userguide/what-is.html"
  },
  "svc-cdk": {
    "id": "svc-cdk",
    "serviceName": "AWS CDK",
    "category": "Developer Tools",
    "isImportant": false,
    "role": "AWS CDK is an official in-scope AWS service in the Developer Tools category for the AWS Machine Learning Engineer - Asso...",
    "plainEnglish": "AWS CDK is an official in-scope AWS service in the Developer Tools category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select AWS CDK over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 AWS CDK (Developer Tools)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "AWS CDK: The standard AWS solution for Developer Tools in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when AWS CDK offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose AWS CDK whenever you need native, fully managed AWS capability for Developer Tools workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Developer Tools.",
      "High-Yield Status: Standard In-Scope Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose AWS CDK whenever you need native, fully managed AWS capability for Developer Tools workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/cdk/latest/userguide/what-is.html"
  },
  "svc-codeartifact": {
    "id": "svc-codeartifact",
    "serviceName": "AWS CodeArtifact",
    "category": "Developer Tools",
    "isImportant": false,
    "role": "AWS CodeArtifact is an official in-scope AWS service in the Developer Tools category for the AWS Machine Learning Engine...",
    "plainEnglish": "AWS CodeArtifact is an official in-scope AWS service in the Developer Tools category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select AWS CodeArtifact over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 AWS CodeArtifact (Developer Tools)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "AWS CodeArtifact: The standard AWS solution for Developer Tools in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when AWS CodeArtifact offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose AWS CodeArtifact whenever you need native, fully managed AWS capability for Developer Tools workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Developer Tools.",
      "High-Yield Status: Standard In-Scope Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose AWS CodeArtifact whenever you need native, fully managed AWS capability for Developer Tools workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/codeartifact/latest/userguide/what-is.html"
  },
  "svc-codebuild": {
    "id": "svc-codebuild",
    "serviceName": "AWS CodeBuild",
    "category": "Developer Tools",
    "isImportant": true,
    "role": "AWS CodeBuild is an official in-scope AWS service in the Developer Tools category for the AWS Machine Learning Engineer ...",
    "plainEnglish": "AWS CodeBuild is an official in-scope AWS service in the Developer Tools category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select AWS CodeBuild over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 AWS CodeBuild (Developer Tools)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "AWS CodeBuild: The standard AWS solution for Developer Tools in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when AWS CodeBuild offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose AWS CodeBuild whenever you need native, fully managed AWS capability for Developer Tools workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Developer Tools.",
      "High-Yield Status: \ud83d\udd25 Essential Core Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose AWS CodeBuild whenever you need native, fully managed AWS capability for Developer Tools workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/codebuild/latest/userguide/what-is.html"
  },
  "svc-codecommit": {
    "id": "svc-codecommit",
    "serviceName": "AWS CodeCommit",
    "category": "Developer Tools",
    "isImportant": false,
    "role": "AWS CodeCommit is an official in-scope AWS service in the Developer Tools category for the AWS Machine Learning Engineer...",
    "plainEnglish": "AWS CodeCommit is an official in-scope AWS service in the Developer Tools category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select AWS CodeCommit over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 AWS CodeCommit (Developer Tools)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "AWS CodeCommit: The standard AWS solution for Developer Tools in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when AWS CodeCommit offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose AWS CodeCommit whenever you need native, fully managed AWS capability for Developer Tools workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Developer Tools.",
      "High-Yield Status: Standard In-Scope Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose AWS CodeCommit whenever you need native, fully managed AWS capability for Developer Tools workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/codecommit/latest/userguide/what-is.html"
  },
  "svc-codeconnections": {
    "id": "svc-codeconnections",
    "serviceName": "AWS CodeConnections",
    "category": "Developer Tools",
    "isImportant": false,
    "role": "AWS CodeConnections is an official in-scope AWS service in the Developer Tools category for the AWS Machine Learning Eng...",
    "plainEnglish": "AWS CodeConnections is an official in-scope AWS service in the Developer Tools category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select AWS CodeConnections over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 AWS CodeConnections (Developer Tools)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "AWS CodeConnections: The standard AWS solution for Developer Tools in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when AWS CodeConnections offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose AWS CodeConnections whenever you need native, fully managed AWS capability for Developer Tools workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Developer Tools.",
      "High-Yield Status: Standard In-Scope Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose AWS CodeConnections whenever you need native, fully managed AWS capability for Developer Tools workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/codeconnections/latest/userguide/what-is.html"
  },
  "svc-codedeploy": {
    "id": "svc-codedeploy",
    "serviceName": "AWS CodeDeploy",
    "category": "Developer Tools",
    "isImportant": false,
    "role": "AWS CodeDeploy is an official in-scope AWS service in the Developer Tools category for the AWS Machine Learning Engineer...",
    "plainEnglish": "AWS CodeDeploy is an official in-scope AWS service in the Developer Tools category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select AWS CodeDeploy over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 AWS CodeDeploy (Developer Tools)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "AWS CodeDeploy: The standard AWS solution for Developer Tools in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when AWS CodeDeploy offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose AWS CodeDeploy whenever you need native, fully managed AWS capability for Developer Tools workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Developer Tools.",
      "High-Yield Status: Standard In-Scope Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose AWS CodeDeploy whenever you need native, fully managed AWS capability for Developer Tools workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/codedeploy/latest/userguide/what-is.html"
  },
  "svc-codepipeline": {
    "id": "svc-codepipeline",
    "serviceName": "AWS CodePipeline",
    "category": "Developer Tools",
    "isImportant": true,
    "role": "AWS CodePipeline is an official in-scope AWS service in the Developer Tools category for the AWS Machine Learning Engine...",
    "plainEnglish": "AWS CodePipeline is an official in-scope AWS service in the Developer Tools category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select AWS CodePipeline over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 AWS CodePipeline (Developer Tools)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "AWS CodePipeline: The standard AWS solution for Developer Tools in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when AWS CodePipeline offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose AWS CodePipeline whenever you need native, fully managed AWS capability for Developer Tools workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Developer Tools.",
      "High-Yield Status: \ud83d\udd25 Essential Core Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose AWS CodePipeline whenever you need native, fully managed AWS capability for Developer Tools workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/codepipeline/latest/userguide/what-is.html"
  },
  "svc-xray": {
    "id": "svc-xray",
    "serviceName": "AWS X-Ray",
    "category": "Developer Tools",
    "isImportant": false,
    "role": "AWS X-Ray is an official in-scope AWS service in the Developer Tools category for the AWS Machine Learning Engineer - As...",
    "plainEnglish": "AWS X-Ray is an official in-scope AWS service in the Developer Tools category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select AWS X-Ray over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 AWS X-Ray (Developer Tools)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "AWS X-Ray: The standard AWS solution for Developer Tools in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when AWS X-Ray offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose AWS X-Ray whenever you need native, fully managed AWS capability for Developer Tools workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Developer Tools.",
      "High-Yield Status: Standard In-Scope Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose AWS X-Ray whenever you need native, fully managed AWS capability for Developer Tools workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/xray/latest/userguide/what-is.html"
  },
  "svc-bedrock": {
    "id": "svc-bedrock",
    "serviceName": "Amazon Bedrock",
    "category": "Machine Learning and Artificial Intelligence",
    "isImportant": true,
    "role": "Amazon Bedrock is an official in-scope AWS service in the Machine Learning and Artificial Intelligence category for the ...",
    "plainEnglish": "Amazon Bedrock is an official in-scope AWS service in the Machine Learning and Artificial Intelligence category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select Amazon Bedrock over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 Amazon Bedrock (Machine Learning and Artificial Intelligence)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon Bedrock: The standard AWS solution for Machine Learning and Artificial Intelligence in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when Amazon Bedrock offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose Amazon Bedrock whenever you need native, fully managed AWS capability for Machine Learning and Artificial Intelligence workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Machine Learning and Artificial Intelligence.",
      "High-Yield Status: \ud83d\udd25 Essential Core Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose Amazon Bedrock whenever you need native, fully managed AWS capability for Machine Learning and Artificial Intelligence workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/what-is.html"
  },
  "svc-bedrock-agentcore": {
    "id": "svc-bedrock-agentcore",
    "serviceName": "Amazon Bedrock AgentCore",
    "category": "Machine Learning and Artificial Intelligence",
    "isImportant": true,
    "role": "Amazon Bedrock AgentCore is an official in-scope AWS service in the Machine Learning and Artificial Intelligence categor...",
    "plainEnglish": "Amazon Bedrock AgentCore is an official in-scope AWS service in the Machine Learning and Artificial Intelligence category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select Amazon Bedrock AgentCore over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 Amazon Bedrock AgentCore (Machine Learning and Artificial Intelligence)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon Bedrock AgentCore: The standard AWS solution for Machine Learning and Artificial Intelligence in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when Amazon Bedrock AgentCore offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose Amazon Bedrock AgentCore whenever you need native, fully managed AWS capability for Machine Learning and Artificial Intelligence workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Machine Learning and Artificial Intelligence.",
      "High-Yield Status: \ud83d\udd25 Essential Core Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose Amazon Bedrock AgentCore whenever you need native, fully managed AWS capability for Machine Learning and Artificial Intelligence workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/bedrock-agentcore/latest/userguide/what-is.html"
  },
  "svc-codeguru": {
    "id": "svc-codeguru",
    "serviceName": "Amazon CodeGuru",
    "category": "Machine Learning and Artificial Intelligence",
    "isImportant": false,
    "role": "Amazon CodeGuru is an official in-scope AWS service in the Machine Learning and Artificial Intelligence category for the...",
    "plainEnglish": "Amazon CodeGuru is an official in-scope AWS service in the Machine Learning and Artificial Intelligence category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select Amazon CodeGuru over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 Amazon CodeGuru (Machine Learning and Artificial Intelligence)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon CodeGuru: The standard AWS solution for Machine Learning and Artificial Intelligence in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when Amazon CodeGuru offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose Amazon CodeGuru whenever you need native, fully managed AWS capability for Machine Learning and Artificial Intelligence workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Machine Learning and Artificial Intelligence.",
      "High-Yield Status: Standard In-Scope Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose Amazon CodeGuru whenever you need native, fully managed AWS capability for Machine Learning and Artificial Intelligence workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/codeguru/latest/userguide/what-is.html"
  },
  "svc-comprehend": {
    "id": "svc-comprehend",
    "serviceName": "Amazon Comprehend",
    "category": "Machine Learning and Artificial Intelligence",
    "isImportant": true,
    "role": "Amazon Comprehend is an official in-scope AWS service in the Machine Learning and Artificial Intelligence category for t...",
    "plainEnglish": "Amazon Comprehend is an official in-scope AWS service in the Machine Learning and Artificial Intelligence category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select Amazon Comprehend over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 Amazon Comprehend (Machine Learning and Artificial Intelligence)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon Comprehend: The standard AWS solution for Machine Learning and Artificial Intelligence in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when Amazon Comprehend offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose Amazon Comprehend whenever you need native, fully managed AWS capability for Machine Learning and Artificial Intelligence workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Machine Learning and Artificial Intelligence.",
      "High-Yield Status: \ud83d\udd25 Essential Core Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose Amazon Comprehend whenever you need native, fully managed AWS capability for Machine Learning and Artificial Intelligence workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/comprehend/latest/userguide/what-is.html"
  },
  "svc-comprehend-medical": {
    "id": "svc-comprehend-medical",
    "serviceName": "Amazon Comprehend Medical",
    "category": "Machine Learning and Artificial Intelligence",
    "isImportant": false,
    "role": "Amazon Comprehend Medical is an official in-scope AWS service in the Machine Learning and Artificial Intelligence catego...",
    "plainEnglish": "Amazon Comprehend Medical is an official in-scope AWS service in the Machine Learning and Artificial Intelligence category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select Amazon Comprehend Medical over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 Amazon Comprehend Medical (Machine Learning and Artificial Intelligence)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon Comprehend Medical: The standard AWS solution for Machine Learning and Artificial Intelligence in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when Amazon Comprehend Medical offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose Amazon Comprehend Medical whenever you need native, fully managed AWS capability for Machine Learning and Artificial Intelligence workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Machine Learning and Artificial Intelligence.",
      "High-Yield Status: Standard In-Scope Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose Amazon Comprehend Medical whenever you need native, fully managed AWS capability for Machine Learning and Artificial Intelligence workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/comprehend-medical/latest/userguide/what-is.html"
  },
  "svc-devops-guru": {
    "id": "svc-devops-guru",
    "serviceName": "Amazon DevOps Guru",
    "category": "Machine Learning and Artificial Intelligence",
    "isImportant": false,
    "role": "Amazon DevOps Guru is an official in-scope AWS service in the Machine Learning and Artificial Intelligence category for ...",
    "plainEnglish": "Amazon DevOps Guru is an official in-scope AWS service in the Machine Learning and Artificial Intelligence category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select Amazon DevOps Guru over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 Amazon DevOps Guru (Machine Learning and Artificial Intelligence)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon DevOps Guru: The standard AWS solution for Machine Learning and Artificial Intelligence in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when Amazon DevOps Guru offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose Amazon DevOps Guru whenever you need native, fully managed AWS capability for Machine Learning and Artificial Intelligence workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Machine Learning and Artificial Intelligence.",
      "High-Yield Status: Standard In-Scope Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose Amazon DevOps Guru whenever you need native, fully managed AWS capability for Machine Learning and Artificial Intelligence workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/devops-guru/latest/userguide/what-is.html"
  },
  "svc-healthlake": {
    "id": "svc-healthlake",
    "serviceName": "AWS HealthLake",
    "category": "Machine Learning and Artificial Intelligence",
    "isImportant": false,
    "role": "AWS HealthLake is an official in-scope AWS service in the Machine Learning and Artificial Intelligence category for the ...",
    "plainEnglish": "AWS HealthLake is an official in-scope AWS service in the Machine Learning and Artificial Intelligence category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select AWS HealthLake over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 AWS HealthLake (Machine Learning and Artificial Intelligence)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "AWS HealthLake: The standard AWS solution for Machine Learning and Artificial Intelligence in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when AWS HealthLake offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose AWS HealthLake whenever you need native, fully managed AWS capability for Machine Learning and Artificial Intelligence workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Machine Learning and Artificial Intelligence.",
      "High-Yield Status: Standard In-Scope Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose AWS HealthLake whenever you need native, fully managed AWS capability for Machine Learning and Artificial Intelligence workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/healthlake/latest/userguide/what-is.html"
  },
  "svc-lex": {
    "id": "svc-lex",
    "serviceName": "Amazon Lex",
    "category": "Machine Learning and Artificial Intelligence",
    "isImportant": false,
    "role": "Amazon Lex is an official in-scope AWS service in the Machine Learning and Artificial Intelligence category for the AWS ...",
    "plainEnglish": "Amazon Lex is an official in-scope AWS service in the Machine Learning and Artificial Intelligence category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select Amazon Lex over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 Amazon Lex (Machine Learning and Artificial Intelligence)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon Lex: The standard AWS solution for Machine Learning and Artificial Intelligence in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when Amazon Lex offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose Amazon Lex whenever you need native, fully managed AWS capability for Machine Learning and Artificial Intelligence workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Machine Learning and Artificial Intelligence.",
      "High-Yield Status: Standard In-Scope Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose Amazon Lex whenever you need native, fully managed AWS capability for Machine Learning and Artificial Intelligence workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/lex/latest/userguide/what-is.html"
  },
  "svc-personalize": {
    "id": "svc-personalize",
    "serviceName": "Amazon Personalize",
    "category": "Machine Learning and Artificial Intelligence",
    "isImportant": false,
    "role": "Amazon Personalize is an official in-scope AWS service in the Machine Learning and Artificial Intelligence category for ...",
    "plainEnglish": "Amazon Personalize is an official in-scope AWS service in the Machine Learning and Artificial Intelligence category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select Amazon Personalize over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 Amazon Personalize (Machine Learning and Artificial Intelligence)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon Personalize: The standard AWS solution for Machine Learning and Artificial Intelligence in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when Amazon Personalize offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose Amazon Personalize whenever you need native, fully managed AWS capability for Machine Learning and Artificial Intelligence workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Machine Learning and Artificial Intelligence.",
      "High-Yield Status: Standard In-Scope Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose Amazon Personalize whenever you need native, fully managed AWS capability for Machine Learning and Artificial Intelligence workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/personalize/latest/userguide/what-is.html"
  },
  "svc-polly": {
    "id": "svc-polly",
    "serviceName": "Amazon Polly",
    "category": "Machine Learning and Artificial Intelligence",
    "isImportant": false,
    "role": "Amazon Polly is an official in-scope AWS service in the Machine Learning and Artificial Intelligence category for the AW...",
    "plainEnglish": "Amazon Polly is an official in-scope AWS service in the Machine Learning and Artificial Intelligence category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select Amazon Polly over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 Amazon Polly (Machine Learning and Artificial Intelligence)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon Polly: The standard AWS solution for Machine Learning and Artificial Intelligence in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when Amazon Polly offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose Amazon Polly whenever you need native, fully managed AWS capability for Machine Learning and Artificial Intelligence workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Machine Learning and Artificial Intelligence.",
      "High-Yield Status: Standard In-Scope Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose Amazon Polly whenever you need native, fully managed AWS capability for Machine Learning and Artificial Intelligence workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/polly/latest/userguide/what-is.html"
  },
  "svc-rekognition": {
    "id": "svc-rekognition",
    "serviceName": "Amazon Rekognition",
    "category": "Machine Learning and Artificial Intelligence",
    "isImportant": true,
    "role": "Amazon Rekognition is an official in-scope AWS service in the Machine Learning and Artificial Intelligence category for ...",
    "plainEnglish": "Amazon Rekognition is an official in-scope AWS service in the Machine Learning and Artificial Intelligence category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select Amazon Rekognition over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 Amazon Rekognition (Machine Learning and Artificial Intelligence)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon Rekognition: The standard AWS solution for Machine Learning and Artificial Intelligence in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when Amazon Rekognition offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose Amazon Rekognition whenever you need native, fully managed AWS capability for Machine Learning and Artificial Intelligence workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Machine Learning and Artificial Intelligence.",
      "High-Yield Status: \ud83d\udd25 Essential Core Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose Amazon Rekognition whenever you need native, fully managed AWS capability for Machine Learning and Artificial Intelligence workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/rekognition/latest/userguide/what-is.html"
  },
  "svc-sagemaker": {
    "id": "svc-sagemaker",
    "serviceName": "Amazon SageMaker AI",
    "category": "Machine Learning and Artificial Intelligence",
    "isImportant": true,
    "role": "Amazon SageMaker AI is an official in-scope AWS service in the Machine Learning and Artificial Intelligence category for...",
    "plainEnglish": "Amazon SageMaker AI is an official in-scope AWS service in the Machine Learning and Artificial Intelligence category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select Amazon SageMaker AI over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 Amazon SageMaker AI (Machine Learning and Artificial Intelligence)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon SageMaker AI: The standard AWS solution for Machine Learning and Artificial Intelligence in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when Amazon SageMaker AI offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose Amazon SageMaker AI whenever you need native, fully managed AWS capability for Machine Learning and Artificial Intelligence workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Machine Learning and Artificial Intelligence.",
      "High-Yield Status: \ud83d\udd25 Essential Core Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose Amazon SageMaker AI whenever you need native, fully managed AWS capability for Machine Learning and Artificial Intelligence workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/sagemaker/latest/userguide/what-is.html"
  },
  "svc-textract": {
    "id": "svc-textract",
    "serviceName": "Amazon Textract",
    "category": "Machine Learning and Artificial Intelligence",
    "isImportant": true,
    "role": "Amazon Textract is an official in-scope AWS service in the Machine Learning and Artificial Intelligence category for the...",
    "plainEnglish": "Amazon Textract is an official in-scope AWS service in the Machine Learning and Artificial Intelligence category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select Amazon Textract over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 Amazon Textract (Machine Learning and Artificial Intelligence)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon Textract: The standard AWS solution for Machine Learning and Artificial Intelligence in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when Amazon Textract offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose Amazon Textract whenever you need native, fully managed AWS capability for Machine Learning and Artificial Intelligence workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Machine Learning and Artificial Intelligence.",
      "High-Yield Status: \ud83d\udd25 Essential Core Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose Amazon Textract whenever you need native, fully managed AWS capability for Machine Learning and Artificial Intelligence workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/textract/latest/userguide/what-is.html"
  },
  "svc-transcribe": {
    "id": "svc-transcribe",
    "serviceName": "Amazon Transcribe",
    "category": "Machine Learning and Artificial Intelligence",
    "isImportant": false,
    "role": "Amazon Transcribe is an official in-scope AWS service in the Machine Learning and Artificial Intelligence category for t...",
    "plainEnglish": "Amazon Transcribe is an official in-scope AWS service in the Machine Learning and Artificial Intelligence category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select Amazon Transcribe over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 Amazon Transcribe (Machine Learning and Artificial Intelligence)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon Transcribe: The standard AWS solution for Machine Learning and Artificial Intelligence in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when Amazon Transcribe offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose Amazon Transcribe whenever you need native, fully managed AWS capability for Machine Learning and Artificial Intelligence workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Machine Learning and Artificial Intelligence.",
      "High-Yield Status: Standard In-Scope Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose Amazon Transcribe whenever you need native, fully managed AWS capability for Machine Learning and Artificial Intelligence workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/transcribe/latest/userguide/what-is.html"
  },
  "svc-translate": {
    "id": "svc-translate",
    "serviceName": "Amazon Translate",
    "category": "Machine Learning and Artificial Intelligence",
    "isImportant": false,
    "role": "Amazon Translate is an official in-scope AWS service in the Machine Learning and Artificial Intelligence category for th...",
    "plainEnglish": "Amazon Translate is an official in-scope AWS service in the Machine Learning and Artificial Intelligence category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select Amazon Translate over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 Amazon Translate (Machine Learning and Artificial Intelligence)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon Translate: The standard AWS solution for Machine Learning and Artificial Intelligence in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when Amazon Translate offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose Amazon Translate whenever you need native, fully managed AWS capability for Machine Learning and Artificial Intelligence workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Machine Learning and Artificial Intelligence.",
      "High-Yield Status: Standard In-Scope Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose Amazon Translate whenever you need native, fully managed AWS capability for Machine Learning and Artificial Intelligence workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/translate/latest/userguide/what-is.html"
  },
  "svc-auto-scaling": {
    "id": "svc-auto-scaling",
    "serviceName": "AWS Auto Scaling",
    "category": "Management and Governance",
    "isImportant": false,
    "role": "AWS Auto Scaling is an official in-scope AWS service in the Management and Governance category for the AWS Machine Learn...",
    "plainEnglish": "AWS Auto Scaling is an official in-scope AWS service in the Management and Governance category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select AWS Auto Scaling over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 AWS Auto Scaling (Management and Governance)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "AWS Auto Scaling: The standard AWS solution for Management and Governance in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when AWS Auto Scaling offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose AWS Auto Scaling whenever you need native, fully managed AWS capability for Management and Governance workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Management and Governance.",
      "High-Yield Status: Standard In-Scope Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose AWS Auto Scaling whenever you need native, fully managed AWS capability for Management and Governance workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/auto-scaling/latest/userguide/what-is.html"
  },
  "svc-cloudformation": {
    "id": "svc-cloudformation",
    "serviceName": "AWS CloudFormation",
    "category": "Management and Governance",
    "isImportant": false,
    "role": "AWS CloudFormation is an official in-scope AWS service in the Management and Governance category for the AWS Machine Lea...",
    "plainEnglish": "AWS CloudFormation is an official in-scope AWS service in the Management and Governance category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select AWS CloudFormation over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 AWS CloudFormation (Management and Governance)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "AWS CloudFormation: The standard AWS solution for Management and Governance in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when AWS CloudFormation offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose AWS CloudFormation whenever you need native, fully managed AWS capability for Management and Governance workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Management and Governance.",
      "High-Yield Status: Standard In-Scope Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose AWS CloudFormation whenever you need native, fully managed AWS capability for Management and Governance workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/cloudformation/latest/userguide/what-is.html"
  },
  "svc-cloudtrail": {
    "id": "svc-cloudtrail",
    "serviceName": "AWS CloudTrail",
    "category": "Management and Governance",
    "isImportant": true,
    "role": "AWS CloudTrail is an official in-scope AWS service in the Management and Governance category for the AWS Machine Learnin...",
    "plainEnglish": "AWS CloudTrail is an official in-scope AWS service in the Management and Governance category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select AWS CloudTrail over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 AWS CloudTrail (Management and Governance)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "AWS CloudTrail: The standard AWS solution for Management and Governance in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when AWS CloudTrail offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose AWS CloudTrail whenever you need native, fully managed AWS capability for Management and Governance workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Management and Governance.",
      "High-Yield Status: \ud83d\udd25 Essential Core Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose AWS CloudTrail whenever you need native, fully managed AWS capability for Management and Governance workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/cloudtrail/latest/userguide/what-is.html"
  },
  "svc-cloudwatch": {
    "id": "svc-cloudwatch",
    "serviceName": "Amazon CloudWatch",
    "category": "Management and Governance",
    "isImportant": true,
    "role": "Amazon CloudWatch is an official in-scope AWS service in the Management and Governance category for the AWS Machine Lear...",
    "plainEnglish": "Amazon CloudWatch is an official in-scope AWS service in the Management and Governance category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select Amazon CloudWatch over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 Amazon CloudWatch (Management and Governance)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon CloudWatch: The standard AWS solution for Management and Governance in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when Amazon CloudWatch offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose Amazon CloudWatch whenever you need native, fully managed AWS capability for Management and Governance workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Management and Governance.",
      "High-Yield Status: \ud83d\udd25 Essential Core Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose Amazon CloudWatch whenever you need native, fully managed AWS capability for Management and Governance workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/cloudwatch/latest/userguide/what-is.html"
  },
  "svc-compute-optimizer": {
    "id": "svc-compute-optimizer",
    "serviceName": "AWS Compute Optimizer",
    "category": "Management and Governance",
    "isImportant": false,
    "role": "AWS Compute Optimizer is an official in-scope AWS service in the Management and Governance category for the AWS Machine ...",
    "plainEnglish": "AWS Compute Optimizer is an official in-scope AWS service in the Management and Governance category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select AWS Compute Optimizer over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 AWS Compute Optimizer (Management and Governance)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "AWS Compute Optimizer: The standard AWS solution for Management and Governance in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when AWS Compute Optimizer offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose AWS Compute Optimizer whenever you need native, fully managed AWS capability for Management and Governance workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Management and Governance.",
      "High-Yield Status: Standard In-Scope Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose AWS Compute Optimizer whenever you need native, fully managed AWS capability for Management and Governance workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/compute-optimizer/latest/userguide/what-is.html"
  },
  "svc-config": {
    "id": "svc-config",
    "serviceName": "AWS Config",
    "category": "Management and Governance",
    "isImportant": true,
    "role": "AWS Config is an official in-scope AWS service in the Management and Governance category for the AWS Machine Learning En...",
    "plainEnglish": "AWS Config is an official in-scope AWS service in the Management and Governance category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select AWS Config over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 AWS Config (Management and Governance)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "AWS Config: The standard AWS solution for Management and Governance in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when AWS Config offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose AWS Config whenever you need native, fully managed AWS capability for Management and Governance workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Management and Governance.",
      "High-Yield Status: \ud83d\udd25 Essential Core Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose AWS Config whenever you need native, fully managed AWS capability for Management and Governance workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/config/latest/userguide/what-is.html"
  },
  "svc-organizations": {
    "id": "svc-organizations",
    "serviceName": "AWS Organizations",
    "category": "Management and Governance",
    "isImportant": false,
    "role": "AWS Organizations is an official in-scope AWS service in the Management and Governance category for the AWS Machine Lear...",
    "plainEnglish": "AWS Organizations is an official in-scope AWS service in the Management and Governance category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select AWS Organizations over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 AWS Organizations (Management and Governance)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "AWS Organizations: The standard AWS solution for Management and Governance in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when AWS Organizations offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose AWS Organizations whenever you need native, fully managed AWS capability for Management and Governance workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Management and Governance.",
      "High-Yield Status: Standard In-Scope Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose AWS Organizations whenever you need native, fully managed AWS capability for Management and Governance workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/organizations/latest/userguide/what-is.html"
  },
  "svc-service-catalog": {
    "id": "svc-service-catalog",
    "serviceName": "AWS Service Catalog",
    "category": "Management and Governance",
    "isImportant": false,
    "role": "AWS Service Catalog is an official in-scope AWS service in the Management and Governance category for the AWS Machine Le...",
    "plainEnglish": "AWS Service Catalog is an official in-scope AWS service in the Management and Governance category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select AWS Service Catalog over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 AWS Service Catalog (Management and Governance)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "AWS Service Catalog: The standard AWS solution for Management and Governance in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when AWS Service Catalog offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose AWS Service Catalog whenever you need native, fully managed AWS capability for Management and Governance workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Management and Governance.",
      "High-Yield Status: Standard In-Scope Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose AWS Service Catalog whenever you need native, fully managed AWS capability for Management and Governance workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/service-catalog/latest/userguide/what-is.html"
  },
  "svc-systems-manager": {
    "id": "svc-systems-manager",
    "serviceName": "AWS Systems Manager",
    "category": "Management and Governance",
    "isImportant": false,
    "role": "AWS Systems Manager is an official in-scope AWS service in the Management and Governance category for the AWS Machine Le...",
    "plainEnglish": "AWS Systems Manager is an official in-scope AWS service in the Management and Governance category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select AWS Systems Manager over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 AWS Systems Manager (Management and Governance)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "AWS Systems Manager: The standard AWS solution for Management and Governance in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when AWS Systems Manager offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose AWS Systems Manager whenever you need native, fully managed AWS capability for Management and Governance workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Management and Governance.",
      "High-Yield Status: Standard In-Scope Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose AWS Systems Manager whenever you need native, fully managed AWS capability for Management and Governance workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/systems-manager/latest/userguide/what-is.html"
  },
  "svc-trusted-advisor": {
    "id": "svc-trusted-advisor",
    "serviceName": "AWS Trusted Advisor",
    "category": "Management and Governance",
    "isImportant": false,
    "role": "AWS Trusted Advisor is an official in-scope AWS service in the Management and Governance category for the AWS Machine Le...",
    "plainEnglish": "AWS Trusted Advisor is an official in-scope AWS service in the Management and Governance category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select AWS Trusted Advisor over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 AWS Trusted Advisor (Management and Governance)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "AWS Trusted Advisor: The standard AWS solution for Management and Governance in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when AWS Trusted Advisor offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose AWS Trusted Advisor whenever you need native, fully managed AWS capability for Management and Governance workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Management and Governance.",
      "High-Yield Status: Standard In-Scope Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose AWS Trusted Advisor whenever you need native, fully managed AWS capability for Management and Governance workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/trusted-advisor/latest/userguide/what-is.html"
  },
  "svc-kinesis-video-streams": {
    "id": "svc-kinesis-video-streams",
    "serviceName": "Amazon Kinesis Video Streams",
    "category": "Media",
    "isImportant": false,
    "role": "Amazon Kinesis Video Streams is an official in-scope AWS service in the Media category for the AWS Machine Learning Engi...",
    "plainEnglish": "Amazon Kinesis Video Streams is an official in-scope AWS service in the Media category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select Amazon Kinesis Video Streams over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 Amazon Kinesis Video Streams (Media)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon Kinesis Video Streams: The standard AWS solution for Media in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when Amazon Kinesis Video Streams offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose Amazon Kinesis Video Streams whenever you need native, fully managed AWS capability for Media workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Media.",
      "High-Yield Status: Standard In-Scope Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose Amazon Kinesis Video Streams whenever you need native, fully managed AWS capability for Media workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/kinesis-video-streams/latest/userguide/what-is.html"
  },
  "svc-datasync": {
    "id": "svc-datasync",
    "serviceName": "AWS DataSync",
    "category": "Migration and Transfer",
    "isImportant": false,
    "role": "AWS DataSync is an official in-scope AWS service in the Migration and Transfer category for the AWS Machine Learning Eng...",
    "plainEnglish": "AWS DataSync is an official in-scope AWS service in the Migration and Transfer category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select AWS DataSync over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 AWS DataSync (Migration and Transfer)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "AWS DataSync: The standard AWS solution for Migration and Transfer in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when AWS DataSync offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose AWS DataSync whenever you need native, fully managed AWS capability for Migration and Transfer workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Migration and Transfer.",
      "High-Yield Status: Standard In-Scope Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose AWS DataSync whenever you need native, fully managed AWS capability for Migration and Transfer workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/datasync/latest/userguide/what-is.html"
  },
  "svc-api-gateway": {
    "id": "svc-api-gateway",
    "serviceName": "Amazon API Gateway",
    "category": "Networking and Content Delivery",
    "isImportant": false,
    "role": "Amazon API Gateway is an official in-scope AWS service in the Networking and Content Delivery category for the AWS Machi...",
    "plainEnglish": "Amazon API Gateway is an official in-scope AWS service in the Networking and Content Delivery category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select Amazon API Gateway over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 Amazon API Gateway (Networking and Content Delivery)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon API Gateway: The standard AWS solution for Networking and Content Delivery in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when Amazon API Gateway offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose Amazon API Gateway whenever you need native, fully managed AWS capability for Networking and Content Delivery workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Networking and Content Delivery.",
      "High-Yield Status: Standard In-Scope Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose Amazon API Gateway whenever you need native, fully managed AWS capability for Networking and Content Delivery workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/api-gateway/latest/userguide/what-is.html"
  },
  "svc-cloudfront": {
    "id": "svc-cloudfront",
    "serviceName": "Amazon CloudFront",
    "category": "Networking and Content Delivery",
    "isImportant": false,
    "role": "Amazon CloudFront is an official in-scope AWS service in the Networking and Content Delivery category for the AWS Machin...",
    "plainEnglish": "Amazon CloudFront is an official in-scope AWS service in the Networking and Content Delivery category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select Amazon CloudFront over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 Amazon CloudFront (Networking and Content Delivery)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon CloudFront: The standard AWS solution for Networking and Content Delivery in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when Amazon CloudFront offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose Amazon CloudFront whenever you need native, fully managed AWS capability for Networking and Content Delivery workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Networking and Content Delivery.",
      "High-Yield Status: Standard In-Scope Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose Amazon CloudFront whenever you need native, fully managed AWS capability for Networking and Content Delivery workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/cloudfront/latest/userguide/what-is.html"
  },
  "svc-direct-connect": {
    "id": "svc-direct-connect",
    "serviceName": "AWS Direct Connect",
    "category": "Networking and Content Delivery",
    "isImportant": false,
    "role": "AWS Direct Connect is an official in-scope AWS service in the Networking and Content Delivery category for the AWS Machi...",
    "plainEnglish": "AWS Direct Connect is an official in-scope AWS service in the Networking and Content Delivery category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select AWS Direct Connect over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 AWS Direct Connect (Networking and Content Delivery)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "AWS Direct Connect: The standard AWS solution for Networking and Content Delivery in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when AWS Direct Connect offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose AWS Direct Connect whenever you need native, fully managed AWS capability for Networking and Content Delivery workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Networking and Content Delivery.",
      "High-Yield Status: Standard In-Scope Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose AWS Direct Connect whenever you need native, fully managed AWS capability for Networking and Content Delivery workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/direct-connect/latest/userguide/what-is.html"
  },
  "svc-vpc": {
    "id": "svc-vpc",
    "serviceName": "Amazon VPC",
    "category": "Networking and Content Delivery",
    "isImportant": true,
    "role": "Amazon VPC is an official in-scope AWS service in the Networking and Content Delivery category for the AWS Machine Learn...",
    "plainEnglish": "Amazon VPC is an official in-scope AWS service in the Networking and Content Delivery category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select Amazon VPC over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 Amazon VPC (Networking and Content Delivery)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon VPC: The standard AWS solution for Networking and Content Delivery in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when Amazon VPC offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose Amazon VPC whenever you need native, fully managed AWS capability for Networking and Content Delivery workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Networking and Content Delivery.",
      "High-Yield Status: \ud83d\udd25 Essential Core Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose Amazon VPC whenever you need native, fully managed AWS capability for Networking and Content Delivery workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/vpc/latest/userguide/what-is.html"
  },
  "svc-iam": {
    "id": "svc-iam",
    "serviceName": "IAM",
    "category": "Security, Identity, and Compliance",
    "isImportant": true,
    "role": "IAM is an official in-scope AWS service in the Security, Identity, and Compliance category for the AWS Machine Learning ...",
    "plainEnglish": "IAM is an official in-scope AWS service in the Security, Identity, and Compliance category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select IAM over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 IAM (Security, Identity, and Compliance)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "IAM: The standard AWS solution for Security, Identity, and Compliance in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when IAM offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose IAM whenever you need native, fully managed AWS capability for Security, Identity, and Compliance workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Security, Identity, and Compliance.",
      "High-Yield Status: \ud83d\udd25 Essential Core Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose IAM whenever you need native, fully managed AWS capability for Security, Identity, and Compliance workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/iam/latest/userguide/what-is.html"
  },
  "svc-inspector": {
    "id": "svc-inspector",
    "serviceName": "Amazon Inspector",
    "category": "Security, Identity, and Compliance",
    "isImportant": false,
    "role": "Amazon Inspector is an official in-scope AWS service in the Security, Identity, and Compliance category for the AWS Mach...",
    "plainEnglish": "Amazon Inspector is an official in-scope AWS service in the Security, Identity, and Compliance category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select Amazon Inspector over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 Amazon Inspector (Security, Identity, and Compliance)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon Inspector: The standard AWS solution for Security, Identity, and Compliance in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when Amazon Inspector offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose Amazon Inspector whenever you need native, fully managed AWS capability for Security, Identity, and Compliance workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Security, Identity, and Compliance.",
      "High-Yield Status: Standard In-Scope Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose Amazon Inspector whenever you need native, fully managed AWS capability for Security, Identity, and Compliance workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/inspector/latest/userguide/what-is.html"
  },
  "svc-kms": {
    "id": "svc-kms",
    "serviceName": "AWS KMS",
    "category": "Security, Identity, and Compliance",
    "isImportant": true,
    "role": "AWS KMS is an official in-scope AWS service in the Security, Identity, and Compliance category for the AWS Machine Learn...",
    "plainEnglish": "AWS KMS is an official in-scope AWS service in the Security, Identity, and Compliance category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select AWS KMS over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 AWS KMS (Security, Identity, and Compliance)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "AWS KMS: The standard AWS solution for Security, Identity, and Compliance in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when AWS KMS offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose AWS KMS whenever you need native, fully managed AWS capability for Security, Identity, and Compliance workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Security, Identity, and Compliance.",
      "High-Yield Status: \ud83d\udd25 Essential Core Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose AWS KMS whenever you need native, fully managed AWS capability for Security, Identity, and Compliance workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/kms/latest/userguide/what-is.html"
  },
  "svc-macie": {
    "id": "svc-macie",
    "serviceName": "Amazon Macie",
    "category": "Security, Identity, and Compliance",
    "isImportant": false,
    "role": "Amazon Macie is an official in-scope AWS service in the Security, Identity, and Compliance category for the AWS Machine ...",
    "plainEnglish": "Amazon Macie is an official in-scope AWS service in the Security, Identity, and Compliance category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select Amazon Macie over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 Amazon Macie (Security, Identity, and Compliance)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon Macie: The standard AWS solution for Security, Identity, and Compliance in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when Amazon Macie offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose Amazon Macie whenever you need native, fully managed AWS capability for Security, Identity, and Compliance workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Security, Identity, and Compliance.",
      "High-Yield Status: Standard In-Scope Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose Amazon Macie whenever you need native, fully managed AWS capability for Security, Identity, and Compliance workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/macie/latest/userguide/what-is.html"
  },
  "svc-secrets-manager": {
    "id": "svc-secrets-manager",
    "serviceName": "AWS Secrets Manager",
    "category": "Security, Identity, and Compliance",
    "isImportant": false,
    "role": "AWS Secrets Manager is an official in-scope AWS service in the Security, Identity, and Compliance category for the AWS M...",
    "plainEnglish": "AWS Secrets Manager is an official in-scope AWS service in the Security, Identity, and Compliance category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select AWS Secrets Manager over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 AWS Secrets Manager (Security, Identity, and Compliance)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "AWS Secrets Manager: The standard AWS solution for Security, Identity, and Compliance in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when AWS Secrets Manager offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose AWS Secrets Manager whenever you need native, fully managed AWS capability for Security, Identity, and Compliance workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Security, Identity, and Compliance.",
      "High-Yield Status: Standard In-Scope Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose AWS Secrets Manager whenever you need native, fully managed AWS capability for Security, Identity, and Compliance workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/secrets-manager/latest/userguide/what-is.html"
  },
  "svc-ebs": {
    "id": "svc-ebs",
    "serviceName": "Amazon EBS",
    "category": "Storage",
    "isImportant": true,
    "role": "Amazon EBS is an official in-scope AWS service in the Storage category for the AWS Machine Learning Engineer - Associate...",
    "plainEnglish": "Amazon EBS is an official in-scope AWS service in the Storage category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select Amazon EBS over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 Amazon EBS (Storage)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon EBS: The standard AWS solution for Storage in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when Amazon EBS offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose Amazon EBS whenever you need native, fully managed AWS capability for Storage workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Storage.",
      "High-Yield Status: \ud83d\udd25 Essential Core Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose Amazon EBS whenever you need native, fully managed AWS capability for Storage workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/ebs/latest/userguide/what-is.html"
  },
  "svc-efs": {
    "id": "svc-efs",
    "serviceName": "Amazon EFS",
    "category": "Storage",
    "isImportant": true,
    "role": "Amazon EFS is an official in-scope AWS service in the Storage category for the AWS Machine Learning Engineer - Associate...",
    "plainEnglish": "Amazon EFS is an official in-scope AWS service in the Storage category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select Amazon EFS over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 Amazon EFS (Storage)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon EFS: The standard AWS solution for Storage in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when Amazon EFS offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose Amazon EFS whenever you need native, fully managed AWS capability for Storage workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Storage.",
      "High-Yield Status: \ud83d\udd25 Essential Core Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose Amazon EFS whenever you need native, fully managed AWS capability for Storage workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/efs/latest/userguide/what-is.html"
  },
  "svc-fsx": {
    "id": "svc-fsx",
    "serviceName": "Amazon FSx",
    "category": "Storage",
    "isImportant": true,
    "role": "Amazon FSx is an official in-scope AWS service in the Storage category for the AWS Machine Learning Engineer - Associate...",
    "plainEnglish": "Amazon FSx is an official in-scope AWS service in the Storage category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select Amazon FSx over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 Amazon FSx (Storage)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon FSx: The standard AWS solution for Storage in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when Amazon FSx offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose Amazon FSx whenever you need native, fully managed AWS capability for Storage workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Storage.",
      "High-Yield Status: \ud83d\udd25 Essential Core Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose Amazon FSx whenever you need native, fully managed AWS capability for Storage workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/fsx/latest/userguide/what-is.html"
  },
  "svc-s3": {
    "id": "svc-s3",
    "serviceName": "Amazon S3",
    "category": "Storage",
    "isImportant": true,
    "role": "Amazon S3 is an official in-scope AWS service in the Storage category for the AWS Machine Learning Engineer - Associate ...",
    "plainEnglish": "Amazon S3 is an official in-scope AWS service in the Storage category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select Amazon S3 over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 Amazon S3 (Storage)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon S3: The standard AWS solution for Storage in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when Amazon S3 offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose Amazon S3 whenever you need native, fully managed AWS capability for Storage workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Storage.",
      "High-Yield Status: \ud83d\udd25 Essential Core Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose Amazon S3 whenever you need native, fully managed AWS capability for Storage workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/s3/latest/userguide/what-is.html"
  },
  "svc-s3-glacier": {
    "id": "svc-s3-glacier",
    "serviceName": "Amazon S3 Glacier",
    "category": "Storage",
    "isImportant": false,
    "role": "Amazon S3 Glacier is an official in-scope AWS service in the Storage category for the AWS Machine Learning Engineer - As...",
    "plainEnglish": "Amazon S3 Glacier is an official in-scope AWS service in the Storage category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select Amazon S3 Glacier over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 Amazon S3 Glacier (Storage)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon S3 Glacier: The standard AWS solution for Storage in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when Amazon S3 Glacier offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose Amazon S3 Glacier whenever you need native, fully managed AWS capability for Storage workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Storage.",
      "High-Yield Status: Standard In-Scope Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose Amazon S3 Glacier whenever you need native, fully managed AWS capability for Storage workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/s3-glacier/latest/userguide/what-is.html"
  },
  "svc-storage-gateway": {
    "id": "svc-storage-gateway",
    "serviceName": "AWS Storage Gateway",
    "category": "Storage",
    "isImportant": false,
    "role": "AWS Storage Gateway is an official in-scope AWS service in the Storage category for the AWS Machine Learning Engineer - ...",
    "plainEnglish": "AWS Storage Gateway is an official in-scope AWS service in the Storage category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. Understanding when to select AWS Storage Gateway over competing services is a frequent target of high-scoring exam questions.",
    "diagram": "  [ Upstream Pipeline / Event Producer ]\n                     \u2502\n                     \u25bc\n  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 AWS Storage Gateway (Storage)                                    \u2502\n  \u2502 \u2022 IAM Execution Role (Least-Privilege Principle)       \u2502\n  \u2502 \u2022 AWS KMS CMK Encryption at Rest (Envelope Encryption) \u2502\n  \u2502 \u2022 VPC Interface Endpoint / PrivateLink Network Path    \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n                           \u2502\n                           \u25bc\n  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]",
    "handwrittenNotes": {
      "mnemonic": "AWS Storage Gateway: The standard AWS solution for Storage in enterprise ML.",
      "examTrap": "Deploying an unmanaged self-hosted EC2 software package when AWS Storage Gateway offers a fully managed, scalable native AWS solution.",
      "goldenRule": "Choose AWS Storage Gateway whenever you need native, fully managed AWS capability for Storage workloads with zero server administration."
    },
    "bulletPoints": [
      "Category: Storage.",
      "High-Yield Status: Standard In-Scope Service.",
      "High Availability: Built-in multi-AZ redundancy and automatic failover.",
      "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
      "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ],
    "scenarioTip": "Choose AWS Storage Gateway whenever you need native, fully managed AWS capability for Storage workloads with zero server administration.",
    "url": "https://docs.aws.amazon.com/storage-gateway/latest/userguide/what-is.html"
  }
};

export const AWS_SERVICE_CATEGORIES = [
  "Analytics",
  "Application Integration",
  "Cloud Financial Management",
  "Compute",
  "Containers",
  "Database",
  "Developer Tools",
  "Machine Learning and Artificial Intelligence",
  "Management and Governance",
  "Media",
  "Migration and Transfer",
  "Networking and Content Delivery",
  "Security, Identity, and Compliance",
  "Storage"
];
