import smiles from '../../../chem/smiles'
import { StructProvider } from '../../../editor'
import { StructureService } from '../StructureService'

export class SmilesServiceStrategy implements StructureService {
  constructor(protected readonly structProvider: StructProvider) {}

  getStructureAsync(): Promise<string> {
    const struct = this.structProvider.struct()
    const stringifiedMolfile = smiles.stringify(struct)
    return Promise.resolve(stringifiedMolfile)
  }
}
