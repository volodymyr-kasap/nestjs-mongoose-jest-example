import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from '$/app.module';


export const moduleFixture: Promise<TestingModule> = Test.createTestingModule({
  imports: [AppModule],
}).compile();
