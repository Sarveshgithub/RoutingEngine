public with sharing class RE_EngineController {
    @AuraEnabled(cacheable=true)
    public static List<Team__c> fetchTeams() {
        return [SELECT Id, Name, Active__c, Object__c FROM Team__c];
    }
    @AuraEnabled
    public static List<Team_Member__c> fetchTeamMemeber(String teamId) {
        try {
            return [
                SELECT Id, Active__c,Name, Resource__c, Resource__r.Name,CreatedDate
                FROM Team_Member__c
                WHERE Team__c = :teamId
            ];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}