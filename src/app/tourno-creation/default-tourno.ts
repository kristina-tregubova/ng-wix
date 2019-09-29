import { ITourno } from '../core/models/ITourno';

export class DefaultTourno implements ITourno{
    'id'? = null;
    'name' = null;
    'tournamentType' = null;
    'status' = 'pending';
    'game'= null;
    'country' = null;
    'participants' = null;
    'playerType' = null;
    'endDate' = null;
    'startDate' = null;
    'entryFee' = null;
    'prize' = null;
    'description' = null;
    'relatedPlayers' = null;
    'rounds': [];
    'userCreated' = null;
    'userCreatedId'? = null;
}
