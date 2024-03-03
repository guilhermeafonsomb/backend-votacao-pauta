import { Module } from '@nestjs/common';
import { AgendaModule } from './Agenda/agenda.module';
import { CategoryModule } from './Category/category.module';
import { UserModule } from './User/user.module';
import { VoteModule } from './Vote/vote.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [UserModule, AgendaModule, VoteModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
