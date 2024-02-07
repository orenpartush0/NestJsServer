import { PipeTransform,BadRequestException, Injectable, ArgumentMetadata } from '@nestjs/common';


@Injectable()
export class statusValidationPipe implements PipeTransform {
  
  transform(status: string, metadata: ArgumentMetadata) {
    try{
    const validStatusValues = ['PENDING', 'DONE', 'LATE'];
    if (!validStatusValues.includes(status)) {
      throw new BadRequestException(`Invalid status: ${status}. Valid values are ${validStatusValues.join(', ')}`);
    }
      return status;
  }
  catch(BadRequestException){};
  }
}