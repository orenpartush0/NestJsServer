import { PipeTransform,BadRequestException, Injectable, ArgumentMetadata } from '@nestjs/common';


@Injectable()
export class persistenceMethodValidationPipe implements PipeTransform {
  
  transform(persistenceMethod: string, metadata: ArgumentMetadata) {
    try{
    const validpersistenceMethodsValues = ['POSTGRES', 'MONGO'];
    if (!validpersistenceMethodsValues.includes(persistenceMethod)) {
      throw new BadRequestException(`Invalid persistenceMethod: ${persistenceMethod}. Valid values are ${validpersistenceMethodsValues.join(', ')}`);
    }
      return persistenceMethod;
  }
  catch(BadRequestException){};
  }
}