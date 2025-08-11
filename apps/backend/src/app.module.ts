import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PropertiesModule } from './properties/properties.module';
import { ChannelsModule } from './channels/channels.module';
import { TasksModule } from './tasks/tasks.module';
import { MessagesModule } from './messages/messages.module';
import { FilesModule } from './files/files.module';
import { NotificationModule } from './notification/notification.module';
import { RealtimeModule } from './realtime/realtime.module';
import { IngestModule } from './ingest/ingest.module';
import { VendorModule } from './vendor/vendor.module';
import { APModule } from './ap/ap.module';
import { CompetitorModule } from './competitor/competitor.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { AIModule } from './ai/ai.module';
import { CacheModule } from './cache/cache.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      subscriptions: {
        'graphql-ws': true,
      },
      context: ({ req, connection }) => {
        return { req: req || connection.context };
      },
      playground: process.env.NODE_ENV === 'development',
      introspection: true,
    }),
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    PrismaModule,
    CacheModule,
    AuthModule,
    UsersModule,
    PropertiesModule,
    ChannelsModule,
    TasksModule,
    MessagesModule,
    FilesModule,
    NotificationModule,
    RealtimeModule,
    IngestModule,
    VendorModule,
    APModule,
    CompetitorModule,
    AnalyticsModule,
    AIModule,
    HealthModule,
  ],
})
export class AppModule {}