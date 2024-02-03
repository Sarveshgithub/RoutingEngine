
import { LightningElement, track,api } from 'lwc';
import fetchTeamMemeber from "@salesforce/apex/RE_EngineController.fetchTeamMemeber";
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
    { label: "Resoure", fieldName: "Resource__c" },
    
];

export default class Re_teamDetail extends LightningElement {
    @track currentContent = 'tutorial';
    @track tutorialValue = false;
    @track integrationValue = false;
    @track visualforceValue = false;
    @track triggerValue = false;
    @track jqueryJavascriptValue = false;
    @track salesforceLwcValue = false;

    //public variable
    @api team
    // local variable
    temaMemmber 
    columns = columns;
    

    changeHandleAction(event) {
        const selected = event.detail.name;

        this.currentContent = selected;

        if (selected === 'member') {
            this.fetchTeamMember();
            this.tutorialValue = true;
        } else {
            this.tutorialValue = false;
        }
    }

    fetchTeamMember(){
        fetchTeamMemeber({
            teamId : 'a005h00000wYIIsAAO'
        }).then(res =>{
            if(res){
                console.log('res:::',res,this.team);
                this.temaMemmber = res
                console.log('temaMemmber:::',this.temaMemmber);
            }
        }).catch(error =>{
            console.error('Error', error);
        })
    }
}