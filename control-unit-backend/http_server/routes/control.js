const express = require('express');
const {getData, passToManualMode, passToAutomaticMode, editPercentage, getCurrentMode, getCurrentOpenPercentage, getArduinoMode, getLastTemperature, getTemperatureHistory, resolveAlarm} = require("../services/stateService");
const Response = require('./response')
const router = express.Router();
const {send} = require("../socket")

router.use(async (req, res, next) =>
{
    Response.init()
    await next()
    return Response.send(res)
})

router.post('/manual', async function(req, res, next) {
  try{
    await passToManualMode()
    Response.setData(getData())
  }catch (ex){
    Response.setError(ex.message)
  }
});
router.post('/automatic', async function(req, res, next) {
  try{
    await passToAutomaticMode()
    Response.setData(getData())
  }catch (ex){
    Response.setError(ex.message)
  }
});
router.post('/resolve_alarm', async function(req, res, next) {
  try{
    resolveAlarm()
    Response.setData(getData())
  }catch (ex){
    Response.setError(ex.message)
  }
});
router.get('/data', async function(req, res, next){
  Response.setData(getData())
})
router.post('/percentage', async function(req, res, next) {
  try
  {
    await editPercentage(req.body.percentage)
    Response.setData(getData())
    
  }catch (ex){
    Response.setError(ex.message)
  }
});
router.get("/temperatures", async function (req, res, next)
{
  Response.setData(getTemperatureHistory)
})

module.exports = router;
