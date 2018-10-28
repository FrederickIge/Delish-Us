import {observable, action, computed} from 'mobx';
import algolia from 'algoliasearch';
var AlgoliaClient = algolia('9PBF06L4BR', 'c6af2a9913ebd6b8770b5dc9fca5c784');

class schoolStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @observable
  schoolId;

  @observable
  universities = [];
  @observable
  majors = [];

  @observable
  selectedSchool = {};
  @observable
  selectedMajor = {};

  //Retrive a Single School from Algolia
  @action
  getSingleSchool() {
    AlgoliaClient.initIndex('universities')
      .getObject(this.schoolId)
      .then(
        action('fetchSuccess', (response) => {
          this.selectedSchool = response;
        }),
        action('fetchError', (error) => {
          alert(error);
        })
      );
  }

  @computed
  get getTotalCost() {
    let sector = this.selectedSchool['Sector name'];

    if (!sector) {
      return null;
    } else if (sector.includes('2')) {
      return 2 * this.selectedSchool['2013-14 Net price'];
    } else if (sector.includes('4')) {
      return 4 * this.selectedSchool['2013-14 Net price'];
    }
  }

  //Algolia Search for North American Universities
  @action
  searchUniversities(searchText) {
    AlgoliaClient.initIndex('universities').search(searchText, (error, data) => {
      this.universities = data.hits;
    });
  }

  //Algolia Search for College Majors
  @action
  searchMajors(searchText) {
    AlgoliaClient.initIndex('majors').search(searchText, (error, data) => {
      this.majors = data.hits;
    });
  }
}

export default schoolStore;
