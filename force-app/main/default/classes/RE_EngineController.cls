public with sharing class RE_EngineController {
    @AuraEnabled(cacheable=true)
    public static List<Team__c> fetchTeams() {
        return [SELECT Id, Name, Active__c, Object__c FROM Team__c];
    }
}
