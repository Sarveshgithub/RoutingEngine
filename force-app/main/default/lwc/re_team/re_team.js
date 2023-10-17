import { LightningElement ,api, wire} from 'lwc';
import { NavigationMixin } from "lightning/navigation";
import fetchTeams from '@salesforce/apex/RE_EngineController.fetchTeams';
import generateData from './generateData';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';

const columns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Active', fieldName: 'Active__c', type: 'checkbox' },
    { label: 'Object', fieldName: 'Object__c' }
];

export default class Re_team  extends NavigationMixin(LightningElement) {
    data = [];
    columns = columns;
    @api objectApiName ='Account';

    fields = [NAME_FIELD, REVENUE_FIELD, INDUSTRY_FIELD];

    @wire(fetchTeams)
    wiredMyData({ error, data }) {
        if (data) {
            console.log('data:::',data)
            this.data = data;
        } else if (error) {
            console.error('Error loading data: ' + JSON.stringify(error));
        }
    }
    get(){
         console.log('teams:::',this.teams)
    }
    handleSuccess(event) {
        const evt = new ShowToastEvent({
            title: 'Account created',
            message: 'Record ID: ' + event.detail.id,
            variant: 'success',
        });
        this.dispatchEvent(evt);
    }
    connectedCallback() {
        const data = generateData({ amountOfRecords: 100 });
        this.data = data;
    }

    handleNewTeam(){
        this[NavigationMixin.Navigate]({
            type: "standard__objectPage",
            attributes: {
              objectApiName: "Team__c",
              actionName: "new",
            },
            state : {
                navigationLocation: 'RELATED_LIST'
            }
          });
    }
}
