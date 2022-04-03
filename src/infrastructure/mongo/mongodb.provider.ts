import * as mongoose from 'mongoose';

export const mongodbProvider = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(
        'mongodb+srv://stegger:FAKaG3jKTfVl5SbJ@granddatingchatapp.vvxbm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
      ),
  },
];

//Localhost string:
// 'mongodb://localhost/nest'
