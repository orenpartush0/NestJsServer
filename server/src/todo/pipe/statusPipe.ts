import { PipeTransform,BadRequestException, Injectable, ArgumentMetadata } from '@nestjs/common';
import { validStatusValues } from '../enum/enum'
import { stat } from 'fs';

@Injectable()
export class statusValidationPipe implements PipeTransform {
  
  transform(status: string, metadata: ArgumentMetadata) {
    try{
      let valid =validStatusValues.done==status||
      validStatusValues.late==status||
      validStatusValues.pending==status;
    if (!valid) {
      throw new BadRequestException(`Invalid status: ${status}. 
      Valid values are ${validStatusValues.done},
      ${validStatusValues.late},
      ${validStatusValues.pending}`);
    }
      return status;
  }
  catch(BadRequestException){};
  }
}