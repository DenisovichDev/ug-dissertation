FROM python:slim
ENV PYTHONUNBUFFERED 1
WORKDIR /Users/sagnik/Work and Research/Math/Projects/ug-dissertation
COPY . .

RUN pip install --no-cache-dir -r backend/requirements.txt

EXPOSE 8000
EXPOSE 3000