import { PipeTransform,BadRequestException, Injectable, ArgumentMetadata } from '@nestjs/common';


@Injectable()
export class SortByValidationPipe implements PipeTransform {
  
  transform(sortBy: string, metadata: ArgumentMetadata) {
    try{
    const validSortByValues = ['ID', 'DUE_DATE', 'TITLE'];
    if (!validSortByValues.includes(sortBy)) {
      throw new BadRequestException(`Invalid sortBy: ${sortBy}. Valid values are ${validSortByValues.join(', ')}`);
    }
    if(sortBy==validSortByValues[0])
        sortBy='rawid'
    else if(sortBy==validSortByValues[1])
        sortBy='duedate'
    else if(sortBy==validSortByValues[1])
        sortBy='title'
    
    return sortBy;
  }
  catch(BadRequestException){};
  }
}