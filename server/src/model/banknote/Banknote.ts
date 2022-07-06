import Model from "../Model";

export interface TBanknote {
  id: number;
  denominationId: number;
  filename: string;
  name: string;
  description?: string;

  dateCreated: Date;
  userCreated: string;
  dateModified?: Date;
  userModified?: string;
}

const Banknote = Model((user: TBanknote = <TBanknote>{}): TBanknote => {
  const _banknote = Object.assign(<TBanknote>{}, user);
  return {
    get id() {
      return _banknote.id;
    },
    get denominationId() {
      return _banknote.denominationId;
    },
    get filename() {
      return _banknote.filename;
    },
    get name() {
      return _banknote.name;
    },
    get description() {
      return _banknote.description;
    },
    get dateCreated() {
      return _banknote.dateCreated;
    },
    get userCreated() {
      return _banknote.userCreated;
    },
    get dateModified() {
      return _banknote.dateModified;
    },
    get userModified() {
      return _banknote.userModified;
    }
  };
});

export default Banknote;
