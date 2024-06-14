FROM python:latest
ENV PYTHONUNBUFFERED 1
WORKDIR /Users/sagnik/Work and Research/Math/Projects/ug-dissertation
COPY . .

RUN pip install -r backend/requirements.txt

CMD ["sh", "-c", "fastapi run backend/server.py & python3 -m http.server 3000"]

EXPOSE 8000
EXPOSE 3000

# docker build -t ug-dissertation
# docker run -p 8000:8000 -p 3000:3000 ug-dissertation