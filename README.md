# 2048 Game - DevOps CI Practice

Simple browser-based 2048 game.

## Docker run

```bash
docker build -t 2048-game .
docker run -d --name 2048-game -p 8081:80 2048-game
```

Then open http://EC2 PUBLIC SERVER-IP:8081

## CI practice

Recommended pipeline:

GitHub -> Jenkins -> Checkout -> Validate -> Docker Build -> Docker Hub
