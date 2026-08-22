import { FitnessData } from './../workout/workout-creation/workout-creation';
import { Service, signal } from '@angular/core';

@Service()
export class ConfigService {

    private _fitnessData = signal<FitnessData>({ftp:0, thresholdHr:0, maxHr:0});
    readonly fitnessData = this._fitnessData.asReadonly();
    
    updateFitness(data: FitnessData) {
        this._fitnessData.set(data);
    }

}
