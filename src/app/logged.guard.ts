import { CanActivateFn,Router } from '@angular/router';
import { inject, Inject } from '@angular/core';
export const loggedGuard: CanActivateFn = (route, state) => {
  
  if(localStorage?.getItem("accessToken")){
    return true;
  }
  else{
    inject(Router).navigate(["/login"]);
    return false
  }

};
