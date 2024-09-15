import { Module } from '@nestjs/common';
import { LocalConfigModule } from './local-config/local-config.module';

@Module({
  imports: [LocalConfigModule],
})
export class CommonModule {}
