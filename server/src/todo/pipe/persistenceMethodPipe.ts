import { PipeTransform,BadRequestException, Injectable, ArgumentMetadata } from '@nestjs/common';
import { validpersistenceMethodsValues } from '../enum/enum'

@Injectable()
export class persistenceMethodValidationPipe implements PipeTransform {
  
  transform(persistenceMethod: string, metadata: ArgumentMetadata) {
    try{
      let valid=validpersistenceMethodsValues.mongo==persistenceMethod
      valid =valid||validpersistenceMethodsValues.postgres==persistenceMethod
    if (!valid ) {
      throw new BadRequestException(`Invalid persistenceMethod: ${persistenceMethod}.
       Valid values are ${validpersistenceMethodsValues.mongo}, ${validpersistenceMethodsValues.postgres}`);
    }
      return persistenceMethod;
  }
  catch(BadRequestException){};
  }
}