import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safe_url'
})
export class SafeUrlPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }
  transform(url) {
    console.log(url);
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);

  }

}