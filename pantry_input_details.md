
- Use persistent pantry that users can update on each use. 
- Users update the pantry like an inventory then the app uses a snapshot of the pantry. The snapshot is created at time of request. If the user makes any pantry changes while request is running, these will not be taken into account.
- For MVP we can just set up manual adding and removing of items. **MVP has no pantry item quantities — any functionality involving quantities (e.g. quantity fields, "use X units from pantry") is out of scope.** Later we could add item quantities, item grouping by category, marking items as used. 
- For ingredient input, we will build a search and select ingredient picker. For MVP we will build a static ingredient list. 
- Fuzzy matching for typos

data model for each pantry item (MVP: no quantity field)
id
user_id
display_name  → what the user typed / selected
canonical_name → normalized ingredient for planning
category       → produce, protein, dairy, etc.

- We will have one table for all of the pantry items input by all of the users, this is why we will need to include user id with each item. 

- To normalize input, our app can use a dictionary of ingredients. This will actually be in the form of a JSON array with each item looking like this:
{
    "canonical_name": "tomato",
    "category": "produce",
    "synonyms": ["tomatoes", "roma tomato", "cherry tomato", "grape tomato", "canned tomato"]
  } 

- The display name will be the name input by the user. This will be checked against all of the synonyms for a match. The canonical name is the basic name that will be passed to the agent which will make it easier for the agent to reason about. 
- If there is no exact match we can use a fuzzy matching library or LLM reasoning to find the closest match. The dictionary can then be updated. (Let's follow up on potential risk of updating dictionary incorrectly.) 

- Because iterating through this json array on each lookup is O(n * m) where n is the length of the json array and m is the average number of synonyms per item, we can preprocess the data in a map. 

Setting up the dictionary

- We can use the Open Food Facts API to get a big list of ingredients. We just hit the API once and save that data. 
- to set up the synonyms we will need to programmatically create lists of variations of each canonical item including descriptors. 
- We can create a map with an entry for each food category and a list of common descriptors that are usually paired with foods in that category like this:

const allowedDescriptors = { 
	produce: ["fresh", "frozen"], 
	protein: ["boneless", "skinless", "cooked"], 
	pantry: ["canned", "dried"], 
	dairy: ["whole", "skim", "2%"] 
	};
	
We can set up a function to generate lists of synonyms for each ingredient using the descriptors (and other pluralization logic too). 

