import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { singleSpaPropsSubject, SingleSpaProps } from 'src/single-spa/single-spa-props';

@Component({
  selector: 'app-dev',
  templateUrl: './dev.component.html',
  styleUrls: ['./dev.component.scss']
})
export class DevComponent implements OnInit {

  singleSpaProps: SingleSpaProps;
  subscription: Subscription;


  // OR if you don't need to access `singleSpaProps` inside the component
  // then create `Observable` property and use it in template with `async` pipe.
  singleSpaProps$ = singleSpaPropsSubject.asObservable();

  ngOnInit(): void {
    this.subscription = singleSpaPropsSubject.subscribe(
      props => (this.singleSpaProps = props),
    );
  }

  ngOnDestroy(): void {

    this.subscription.unsubscribe();
  }


}
