import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config/envs';

// Application Insights debe inicializarse ANTES de todo lo demás
if (envs.APPINSIGHTS_CONNECTION_STRING) {
  const appInsights = require('applicationinsights');
  appInsights
    .setup(envs.APPINSIGHTS_CONNECTION_STRING)
    .setAutoDependencyCorrelation(true)
    .setAutoCollectRequests(true)
    .setAutoCollectPerformance(true, true)
    .setAutoCollectExceptions(true)
    .setAutoCollectDependencies(true)
    .setAutoCollectConsole(true)
    .setSendLiveMetrics(true)
    .start();
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors();

  const port = process.env.PORT || 3000;

  await app.listen(port, '0.0.0.0');

  console.log(`🚀 Servidor corriendo en puerto ${port}`);

  // DEBUG seguro (sin exponer secretos)
  console.log("DB_USER:", process.env.DB_USER);
  console.log("DB_HOST:", process.env.DB_HOST);
  console.log("DB_PASSWORD exists:", !!process.env.DB_PASSWORD);
}

bootstrap();