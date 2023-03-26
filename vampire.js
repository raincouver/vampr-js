class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVampires = 0;
    let currentCreator = this.creator;
    while (currentCreator) {
      currentCreator = currentCreator.creator;
      numberOfVampires++;
    }

    return numberOfVampires;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {

    //return original if this is the original
    if (!this.creator) {
      return this;
    }

    //find the sibling of the lower lineage vampire in comparison
    let myCreator = this;
    let lineageDifference = Math.abs(this.numberOfVampiresFromOriginal - vampire.numberOfVampiresFromOriginal);

    if (this.isMoreSeniorThan(vampire)) {
      while (lineageDifference > 0) {
        vampire = vampire.creator;
        lineageDifference--;
      }
    }

    if (!this.isMoreSeniorThan(vampire)) {
      while (lineageDifference > 0) {
        myCreator = myCreator.creator;
        lineageDifference--;
      }
    }

    //find the common ancestor of the sibling and the higher lineage vampire in comparison
    while (myCreator !== vampire) {
      myCreator = myCreator.creator;
      vampire = vampire.creator;
    }

    return vampire;
  }
}

module.exports = Vampire;

