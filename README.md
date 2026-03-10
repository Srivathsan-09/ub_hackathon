# Zombie API Discovery & Defense Platform

A full-stack cybersecurity platform to automatically discover, analyze, and classify APIs across enterprise infrastructure to detect "Zombie APIs" (unused or abandoned) and recommend remediation.

## Prerequisites

1.  **Docker & Docker Compose**: Ensure you have Docker installed and running.
2.  **Ollama**: Ensure you have [Ollama](https://ollama.com/) running with the **gemma3:4b** model (which matches your installation).
    ```bash
    ollama run gemma3:4b
    ```
3.  **GitHub Token**: Generate a Personal Access Token (classic) with `repo` scope to enable GitHub scanning.

## Quick Start

1.  **Clone and Configure**:
    Create a `.env` file in the root directory (where `docker-compose.yml` is) and add your GitHub token:
    ```env
    GITHUB_TOKEN=your_personal_access_token_here
    ```

2.  **Launch the Platform**:
    Run the following command to build and start all services (Backend, Frontend, PostgreSQL, Redis):
    ```bash
    docker-compose up --build
    ```

3.  **Generate Demo Data**:
    Once the containers are running, populate the database with dummy APIs to see the system in action:
    ```bash
    docker-compose exec backend python -m demo_data_generator
    ```

4.  **Access the Dashboard**:
    Open your browser and navigate to:
    - **Frontend Dashboard**: [http://localhost:3000](http://localhost:3000)
    - **Backend API Docs**: [http://localhost:8000/docs](http://localhost:8000/docs)

## Key Features

-   **API Ingestion**: Scans GitHub, Kubernetes (mocked if no cluster), and NGINX logs.
-   **Classification**: Identifies Active, Deprecated, and Zombie APIs based on usage.
-   **AI Risk Analysis**: Uses Llama3 via Ollama to perform security risk scoring.
-   **Remediation**: Simulation of disabling endpoints and generating audit logs.

## Troubleshooting

-   **Ollama Connection**: Ensure Ollama is running on your host machine. The backend assumes it's available at `http://host.docker.internal:11434` (Windows/Mac) or your local IP.
-   **Database**: If you encounter connection issues, ensure the `db` container is fully healthy before the backend starts (the `depends_on` handles this).
