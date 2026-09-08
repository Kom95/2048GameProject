# 2048 Game - DevOps CI Practice

Simple browser-based 2048 game.

## Local run

```bash
python3 -m http.server 8080
```

Open http://localhost:8080

## Docker run

```bash
docker build -t 2048-game .
docker run -d --name 2048-game -p 8080:80 2048-game
```

Then open http://SERVER-IP:8080

## CI practice

Recommended pipeline:

GitHub -> Jenkins -> Checkout -> Validate -> Docker Build -> Docker Hub
