FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

# System deps
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl build-essential openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*

# Install Node + prisma cli for python prisma generator
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
  && apt-get install -y nodejs \
  && npm i -g prisma

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy source
COPY app ./app
COPY prisma ./prisma

# Generate Prisma client
RUN prisma generate --schema=./prisma/schema.prisma

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
