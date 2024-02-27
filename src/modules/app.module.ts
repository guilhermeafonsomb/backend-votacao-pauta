import { Module } from '@nestjs/common';
import { AgendaModule } from './Agenda/agenda.module';
import { UserModule } from './User/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [UserModule, AgendaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
