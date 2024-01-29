# Stage 3: Build Python Flask Server
# FROM ubuntu:latest
FROM python:3.10-slim

RUN apt-get update && \
    apt-get install -y python3.10 python3-pip && \
    apt-get install -y tesseract-ocr-ben && \
    rm -rf /var/lib/apt/lists/*

# Set the NLTK data directory
ENV NLTK_DATA /usr/src/app/nltk_data

# Set the working directory
WORKDIR /usr/src/app

# Copy only the requirements file to leverage Docker cache
COPY requirements.txt .

# Install Python packages
RUN pip install --no-cache-dir -r requirements.txt && \
    pip uninstall bson -y && pip uninstall pymongo -y && \
    pip install pymongo && \
    pip install python-dotenv

# Set environment variables from .env file
ARG MONGODB_URL
ARG MONGODB_URI
ARG CORS_ORIGIN

ENV MONGODB_URL=${MONGODB_URL}
ENV MONGODB_URI=${MONGODB_URI}
ENV CORS_ORIGIN=${CORS_ORIGIN}

# Make port 5050 available to the world outside this container
EXPOSE 7050

# Define environment variable
ENV NAME ai-estate

# Copy the rest of your application files into the container
COPY . .

# Run app.py when the container launches
CMD ["python3", "app.py"]

