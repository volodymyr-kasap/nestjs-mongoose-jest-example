import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { Types } from 'mongoose';


@Injectable()
export class ParseObjectIdPipe implements PipeTransform<string> {
  transform (value: string) {
    const isValid = Types.ObjectId.isValid(value);

    if (!isValid) {
      throw new BadRequestException('ObjectId is invalid');
    }

    return value;
  }
}
