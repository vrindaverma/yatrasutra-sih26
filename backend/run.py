import os, uvicorn
if __name__ == '__main__':
    port = int(os.environ.get("PORT", 8000))
    host = os.environ.get("HOST", "0.0.0.0" if "PORT" in os.environ else "127.0.0.1")
    uvicorn.run('app.main:app', host=host, port=port, reload=("PORT" not in os.environ))
