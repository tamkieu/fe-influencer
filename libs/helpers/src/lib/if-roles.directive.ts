import {Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from "@angular/core";
import {Subscription} from "rxjs";
import {RolesService} from "./roles.service";
import {GetAccountByIdFacade} from "@influencer/api-client";

@Directive({
  selector: '[ifRoles]'
})
export class IfRolesDirective implements OnInit, OnDestroy {
  private subscription: Subscription[] = [];
  // the role the user must have
  @Input() public ifRoles!: Array<string>;

  /**
   * @param {ViewContainerRef} viewContainerRef -- the location where we need to render the templateRef
   * @param {TemplateRef<any>} templateRef -- the templateRef to be potentially rendered
   * @param {RolesService} rolesService -- will give us access to the roles a user has
   */
  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private rolesService: RolesService,
    private getAccountByIdFacade: GetAccountByIdFacade
  ) {}

  public ngOnInit(): void {
    this.subscription.push(
      this.getAccountByIdFacade.allGetAccountById$.subscribe(res => {
        if (!res.success || !res.data) {
          // Remove element from DOM
          this.viewContainerRef.clear();
        }
        // user Role are checked by a Roles mention in DOM
        const idx = this.ifRoles.indexOf(<string>res?.data?.role);
        if (idx < 0) {
          this.viewContainerRef.clear();
        } else {
          // appends the ref element to DOM
          this.viewContainerRef.createEmbeddedView(this.templateRef);
        }
      })
    );
  }

  /**
   * on destroy cancels the API if its fetching.
   */
  public ngOnDestroy(): void {
    this.subscription.forEach((subscription: Subscription) => subscription.unsubscribe());
  }
}
