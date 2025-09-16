import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen(
    {
      port,
      host: "0.0.0.0",
      reusePort: true,
    },
    () => {
      log(`serving on port ${port}`);
    },
  );
})();
// server/index.ts 파일 상단에 axios를 가져옵니다.
import axios from "axios";

// ... (기존 express 앱 설정 코드) ...

// [새로운 코드] 네이버 검색 API를 호출하는 라우트를 만듭니다.
app.get("/api/search-naver", async (req, res) => {
  const query = "김천 배금도"; // 검색할 키워드 (나중에 req.query.keyword 등으로 변경 가능)

  // 1. Secrets에 숨겨둔 API 키를 안전하게 불러옵니다.
  const clientId = process.env.NAVER_CLIENT_ID;
  const clientSecret = process.env.NAVER_CLIENT_SECRET;

  const apiUrl = "https://openapi.naver.com/v1/search/blog.json";

  try {
    // 2. axios를 이용해 네이버 서버에 API를 요청합니다.
    const response = await axios.get(apiUrl, {
      params: { query: query }, // 검색어 파라미터
      headers: {
        "X-Naver-Client-Id": clientId, // 발급받은 ID
        "X-Naver-Client-Secret": clientSecret, // 발급받은 Secret
      },
    });

    // 3. 성공하면 결과를 클라이언트(웹)에 전송합니다.
    res.json(response.data);
  } catch (error) {
    // 4. 실패하면 에러 메시지를 전송합니다.
    console.error("네이버 API 호출 중 에러:", error);
    res.status(500).json({ message: "API 호출 실패" });
  }
});

// ... (기존 app.listen 코드) ...
