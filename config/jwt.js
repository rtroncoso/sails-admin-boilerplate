/**
 * Configuration options for JWT
 *
 * Here you can change your settings for generated tokens using
 * sails.services['Token'].issue() method.
 *
 * @type {{secret: (*|string), expires: {unit: string, time: number}}}
 */
module.exports.jwt = {


  /****************************************************************************
   *                                                                          *
   * JWT Secret to use when signing each token.                               *
   *                                                                          *
   * It's extremely important that you change this value                      *
   * on a production enviroment or that it gets loaded                        *
   * on your local.js and it's git ignored.                                   *
   *                                                                          *
   * DO NOT put your production secret's in here or it will                   *
   * be available on your public repositories.                                *
   *                                                                          *
   ***************************************************************************/
  secret: process.env.JWT_SECRET || 'CHANGE_ME',

  /****************************************************************************
   *                                                                          *
   * Time expiry of each token once they are issued.                          *
   *                                                                          *
   * This value will get eval'd using moment.js library,                      *
   * for more information visit http://momentjs.com/docs/                     *
   * and check the unit conversions for diff.                                 *
   *                                                                          *
   * values admitted:                                                         *
   *  unit: ['years', 'months', 'weeks', 'days',                              *
   *         'hours', 'minutes', 'seconds']                                   *
   *  time: integers                                                          *
   *                                                                          *
   ***************************************************************************/
  expires: {
    unit: 'hours',
    time: 24
  }

};