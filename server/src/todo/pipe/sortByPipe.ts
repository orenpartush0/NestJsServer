import { PipeTransform,BadRequestException, Injectable, ArgumentMetadata } from '@nestjs/common';
import { validSortByValues } from '../enum/enum'

@Injectable()
export class SortByValidationPipe implements PipeTransform {
  
  transform(sortBy: string, metadata: ArgumentMetadata) {
    try{
      let valid=validSortByValues.duedate==sortBy|| 
      validSortByValues.id==sortBy ||
      validSortByValues.title==sortBy;

    if (!valid) {
      throw new BadRequestException(`Invalid sortBy: ${sortBy}. 
      Valid values are ${validSortByValues.duedate}
      ${validSortByValues.id},${validSortByValues.title}}`);
    }
    if(sortBy==validSortByValues.id)
        sortBy='rawid'
    else if(sortBy==validSortByValues.duedate)
        sortBy='duedate'
    else if(sortBy==validSortByValues.title)
        sortBy='title'
    
    return sortBy;
  }
  catch(BadRequestException){};
  }
}