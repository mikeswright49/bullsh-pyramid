import React from 'react';
import { Player } from 'types/player';

export const PlayersContext = React.createContext<Player[]>([]);
