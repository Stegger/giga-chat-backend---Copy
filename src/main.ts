import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: { origin: '*', allowedHeaders: '*' },
  });
  /*
  const config = new DocumentBuilder()
    .setTitle('Giga Chat API')
    .setDescription('The Giga Chat API description')
    .setVersion('0.01a')
    .addTag('chat')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  */
  console.log(process.env);
  await app.listen(
    process.env.PORT || 3000,
    '0.0.0.0' || 'localhost',
    function () {
      console.log('Express server listening on port %d', process.env.PORT);
    },
  );
}

bootstrap();
