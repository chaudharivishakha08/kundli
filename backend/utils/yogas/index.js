/**
 * Yoga Registration and Export
 * Initializes all yoga classes and registers them with the YogaRegistry
 */

const { yogaRegistry } = require('./YogaRegistry');

// Import all yoga classes
const SaturnThirdYoga = require('./SaturnThirdYoga');
const VenusInVirgo = require('./VenusInVirgo');
const ShashteshLagni = require('./ShashteshLagni');
const RahuMoonConjuctionOne = require('./RahuMoonConjuctionOne');
const RahuMoonConjuctionTwo = require('./RahuMoonConjuctionTwo');
const SuryaMangalBudhLagna = require('./SuryaMangalBudhLagna');
const DhaneshAshtameshInDhana = require('./DhaneshAshtameshInDhana');
const LabheshDhaneshInDhanaWithShubhDrishti = require('./LabheshDhaneshInDhanaWithShubhDrishti');
const RaviBhagyeshKendraKonaShubhRashi = require('./RaviBhagyeshKendraKonaShubhRashi');
const RaviShaniConjunction = require('./RaviShaniConjunction');
const ShukraMangalConjunctionOwnSigns = require('./ShukraMangalConjunctionOwnSigns');
const VyayeshPanchameshShubhSambandh = require('./VyayeshPanchameshShubhSambandh');
const VyayeshInVyayaWithAshtameshShashtesh = require('./VyayeshInVyayaWithAshtameshShashtesh');
const ShaniRahuInPancham = require('./ShaniRahuInPancham');
const ShaniMangalConjunction = require('./ShaniMangalConjunction');
const RaviShaniAshubhYoga = require('./RaviShaniAshubhYoga');
const GuruShaniConjunctionSpiritual = require('./GuruShaniConjunctionSpiritual');
const RaviChandraShubhYoga = require('./RaviChandraShubhYoga');
const PapagrahaKetuInShashtha = require('./PapagrahaKetuInShashtha');
const ShashteshLagneshParivartan = require('./ShashteshLagneshParivartan');
const ShubhagrahaInShashtha = require('./ShubhagrahaInShashtha');
const BalavanShubhagrahaInVyaya = require('./BalavanShubhagrahaInVyaya');
const LabhBhavaArthaprapti = require('./LabhBhavaArthaprapti');
const MangalInKarka = require('./MangalInKarka');
const MangalBudhConjunction = require('./MangalBudhConjunction');
const ShukraAheadOfRaviShubh = require('./ShukraAheadOfRaviShubh');
const MangalShubhsthitiInShashtha = require('./MangalShubhsthitiInShashtha');
const ShukraDashameshInDhanasthana = require('./ShukraDashameshInDhanasthana');
const ShukraMangalPapiYoga = require('./ShukraMangalPapiYoga');
const ShaniChandraDurgunkarak = require('./ShaniChandraDurgunkarak');
const MangalJalrashiInPancham = require('./MangalJalrashiInPancham');
const MangalJalrashiDoshFemale = require('./MangalJalrashiDoshFemale');
const MangalRahuConjunction = require('./MangalRahuConjunction');



/**
 * Initialize and register all yogas
 * This function should be called once when the application starts
 */
function initializeYogaRegistry() {
  // Create instances of all yoga classes
  const yogas = [
    new SaturnThirdYoga(),
    new ShashteshLagni(),
    new VenusInVirgo(),
    new RahuMoonConjuctionOne(),
    new RahuMoonConjuctionTwo(),
    new SuryaMangalBudhLagna(),
    new DhaneshAshtameshInDhana(),
    new LabheshDhaneshInDhanaWithShubhDrishti(),
    new RaviBhagyeshKendraKonaShubhRashi(),
    new RaviShaniConjunction(),
    new ShukraMangalConjunctionOwnSigns(),
    new VyayeshPanchameshShubhSambandh(),
    new VyayeshInVyayaWithAshtameshShashtesh(),
    new ShaniRahuInPancham(),
    new ShaniMangalConjunction(),
    new RaviShaniAshubhYoga(),
    new GuruShaniConjunctionSpiritual(),
    new RaviChandraShubhYoga(),
    new PapagrahaKetuInShashtha(),
    new ShashteshLagneshParivartan(),
    new ShubhagrahaInShashtha(),
    new BalavanShubhagrahaInVyaya(),
    new LabhBhavaArthaprapti(),
    new MangalInKarka(),
    new MangalBudhConjunction(),
    new ShukraAheadOfRaviShubh(),
    new MangalShubhsthitiInShashtha(),
    new ShukraDashameshInDhanasthana(),
    new ShukraMangalPapiYoga(),
    new ShaniChandraDurgunkarak(),
    new MangalJalrashiInPancham(),
    new MangalJalrashiDoshFemale(),
    new MangalRahuConjunction(),

    // Add more yogas here as they are created
  ];

  // Register all yogas
  yogaRegistry.registerMultiple(yogas);

  // console.log('\n=== Yoga Registry Initialized ===');
  // console.log(`Total yogas registered: ${yogaRegistry.getCount()}`);
  // console.log(yogaRegistry.getInfo());
  // console.log('================================\n');

  return yogaRegistry;
}

module.exports = {
  initializeYogaRegistry,
  yogaRegistry
};
