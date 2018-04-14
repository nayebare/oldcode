/**
 * Author D.Bernard
 */
'use strict'

var expect = require('expect.js')
var Announcement = require('../models/Announcement')
var AnnouncementController = require('../controllers/AnnoucementController')

suite('Announcement Model  & Controller Test', ()=>{

    test('Should create an Announcement object',  async()=>{

      var author = 'Eric'
      var title = 'Help'
      var content = 'Come&Help Me'          
      var postedAt = new Date().format("Y-MM-dd HH:mm:SS")
      var theAnnouncement = new Announcement(author, title, content, postedAt)
      expect(author).to.be.equal(theAnnouncement.getAuthor())
      expect(title).to.be.equal(theAnnouncement.getTitle())
      expect(content).to.be.equal(theAnnouncement.getContent())
      });


      test('Should save an announcement object', async() =>{
      var author = 'Eric'
      var title = 'Help'
      var content = 'Come&Help Me'          
      var postedAt = new Date().format("Y-MM-dd HH:mm:SS")
      var theAnnouncement = new Announcement(author, title, content, postedAt)

      theAnnouncement.save(function(err, result){
      expect(result).to.be.JSON
      expect(result['author'].to.be.equal('Eric'))
      expect(result['title'].to.be.equal('Help'))
      expect(result['content'].to.be.equal('Come&Help Me'))
        })

      });
      

/*
      test('Should retrieve the latest Announcements', async()=> {
          
        var arrayOfAnnouncements = await Announcement.getLatestAnnouncements()
        expect(arrayOfAnnouncements.length).to.be.greaterThan(0)
      })


      test('The controller should save the announcement in the db', async()=>{
        
          var announcementID = await AnnouncementController.saveAnnouncement('Micheal','Innoguration','You are all invited!')
          expect(announcementID).to.be.greaterThan(0)
      })

      test('PublicChartController should get a valid JSON containing latest messages and their associated user status',async()=>{
        var properties = ['announcementObj'];
        var annoucementJSON = await AnnouncementController.getLatestAnnouncements()
        expect(annoucementJSON).to.be.JSON
        expect(annoucementJSON['announcementData']).to.be.an('array')
        annoucementJSON['announcementData'].forEach(element => {
          expect(element).to.be.an('object')
          properties.forEach(prop => {
            expect(element).to.have.property(prop);
          });
        });

        

      })
      */
})