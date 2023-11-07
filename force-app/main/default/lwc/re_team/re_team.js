import { LightningElement, api, wire } from "lwc";
import { NavigationMixin } from "lightning/navigation";
import fetchTeams from "@salesforce/apex/RE_EngineController.fetchTeams";

const columns = [
    {
        label: "Name", fieldName: "Id", type: 'url', typeAttributes: {
            label: {
                fieldName: 'Name',
            }, target: '_blank', // Opens the URL in a new tab
            onclick: 'handleUrlClick'
        }
    },
    { label: "Active", fieldName: "Active__c", type: "checkbox" },
    { label: "Object", fieldName: "Object__c" }
];

export default class Re_team extends NavigationMixin(LightningElement) {
    data = [];
    columns = columns;
    show = true

    @wire(fetchTeams)
    wiredMyData({ error, data }) {
        if (data) {
            console.log("data:::", data);
            this.data = data;
        } else if (error) {
            console.error("Error loading data: " + JSON.stringify(error));
        }
    }
    get() {
        console.log("teams:::", this.teams);
    }
    check() {
        this.show = !this.show
    }
    handleSuccess(event) {
        const evt = new ShowToastEvent({
            title: "Team Created",
            message: "Record ID: " + event.detail.id,
            variant: "success"
        });
        this.dispatchEvent(evt);
    }
    connectedCallback() {
        const urlCells = this.template.querySelectorAll('a.slds-truncate');
        urlCells.forEach(urlCell => {
            urlCell.addEventListener('click', this.handleUrlClick.bind(this));
        });
    }
    handleUrlClick(event) {
        console.log('evnet', event)
    }
    callRowAction(event) {
        const selectedValue = event.detail;
        const actionName = event.detail.action.name;
        console.log('event>>', event, selectedValue, actionName)
        if (actionName === "ActionName") {
            // init your modal here
            this.openModal = true;
        }
    }
    handleNewTeam() {
        this[NavigationMixin.Navigate]({
            type: "standard__objectPage",
            attributes: {
                objectApiName: "Team__c",
                actionName: "new"
            },
            state: {
                navigationLocation: "RELATED_LIST"
            }
        });
    }
}
