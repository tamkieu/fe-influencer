import {Component, OnDestroy, OnInit} from '@angular/core';
import {AllInfluencersFacade, Influencer, InfluencerResourceService} from "@influencer/api-client";
import StatusEnum = Influencer.StatusEnum;
import MaritalStatusEnum = Influencer.MaritalStatusEnum;
import GenderEnum = Influencer.GenderEnum;
import {DEFAULT_PAGINATION_OFFSET, DEFAULT_PAGINATION_PAGE} from "@influencer/helpers";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {AuthenticateService} from "@influencer/authenticate";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'influencer-influencers',
  templateUrl: './influencers.component.html',
  styleUrls: ['./influencers.component.scss']
})
export class InfluencersComponent implements OnInit, OnDestroy {
  isLoading!: boolean;
  statusEnum = StatusEnum;
  maritalStatusEnum = MaritalStatusEnum;
  genderEnum = GenderEnum;
  editId: number | undefined | '';
  loaded$ = this.allInfluencersFacade.loaded$;
  allInfluencers!: Influencer[];
  formInfluencer!: FormGroup;
  private subscriptions = new Subscription();
  $isLogged = this.authenticateService.getAuthenticationAsOb;

  constructor(
    private allInfluencersFacade: AllInfluencersFacade,
    private formBuilder: FormBuilder,
    private influencerResourceService: InfluencerResourceService,
    private authenticateService: AuthenticateService,
    private message: NzMessageService,
  ) {
    this.createFormInfluencer();
    this.allInfluencersFacade.init(DEFAULT_PAGINATION_PAGE, DEFAULT_PAGINATION_OFFSET);
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.allInfluencersFacade.allAllInfluencers$.subscribe(influencers => {
        if(influencers?.length) {
          this.allInfluencers = influencers;
          this.parseInfluencers(influencers);
        }
      })
    )
  }

  deleteRow(id: number, index?: number): void {
    if(id) {
      this.influencerResourceService.deleteInfluencer(id).subscribe(create => this.responseInfluencer('Delete influencer'))
    } else if(index) {
      this.removeInfluencer(index);
    }
  }

  removeInfluencer(i: number) {
    this.itemInfluencer.removeAt(i);
  }


  private createFormInfluencer() {
    this.formInfluencer = this.formBuilder.group({
      influencers: new FormArray([]),
    });
  }

  newInfluencer(): FormGroup {
    return this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      status: ['ACTIVE', Validators.required],
      created_at: [''],
      phone: ['', [Validators.pattern("^((\\+84-?)|0)?[0-9]{10}$")]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$')]],
      birthday: [''],
      maritalStatus: [''],
      gender: [''],
    });
  }

  addInfluencer() {
    this.editId = '';
    this.itemInfluencer.push(this.newInfluencer());
  }

  get itemInfluencer(): FormArray {
    return this.formInfluencer.get('influencers') as FormArray;
  }

  parseInfluencer(influencer: Influencer): FormGroup {
    return new FormGroup({
      id: new FormControl(influencer.id),
      name: new FormControl(influencer.name),
      status: new FormControl(influencer.status),
      phone: new FormControl(influencer.phone),
      email: new FormControl(influencer.email),
      birthday: new FormControl(influencer.birthday),
      maritalStatus: new FormControl(influencer.maritalStatus),
      gender: new FormControl(influencer.gender),
      created_at: new FormControl(influencer.created_at),
    })
  }

  parseInfluencers(data: Influencer[]) {
    this.itemInfluencer.clear();
    for (const influencer of data) {
      this.itemInfluencer.push(this.parseInfluencer(influencer));
    }
  }

  submitForm(index: number) {
    this.isLoading = true;
    if(this.itemInfluencer.controls[index].valid) {
      if(this.itemInfluencer.controls[index].value.id) {
        this.influencerResourceService.updateInfluencer(
          this.itemInfluencer.controls[index].value, parseInt(this.itemInfluencer.controls[index].value.id)
        ).subscribe(update => this.responseInfluencer('Update influencer'))
      } else {
        this.influencerResourceService.createInfluencer(
          this.itemInfluencer.controls[index].value
        ).subscribe(create => this.responseInfluencer('Create influencer'))
      }
    }
  }

  responseInfluencer(type: string): void {
    this.message.create('success', `${type} success!`);
    this.isLoading = false;
    this.editId = undefined;
    this.allInfluencersFacade.init(DEFAULT_PAGINATION_PAGE, DEFAULT_PAGINATION_OFFSET);
    return;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  editItem(id: number) {
    if(this.authenticateService.authoritiesConstantsAdmin()) {
      this.editId = id;
    }
  }
}

