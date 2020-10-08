import DeckOverview from "./screens/DeckOverviewScreen";
import AddCard from './screens/AddCardScreen';
import Quiz from './screens/QuizScreen';

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  DeckOverview: DeckOverview;
  AddCard: AddCard;
  Quiz: Quiz;
};

export type BottomTabParamList = {
  Decks: undefined;
  AddDeck: undefined;
};

export type TabOneParamList = {
  DeckList: undefined;
};

export type TabTwoParamList = {
  AddDeck: undefined;
};
