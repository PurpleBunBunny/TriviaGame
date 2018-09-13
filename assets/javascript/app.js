
$(document).ready(function() {

  var intervalId;
   
  var clockRunning = false;
  
  var triviaGame = {
      arrQuestion: [
          { 
              questionNumber: 1,
              questionText: "What is the name of the main character of the anime series Naruto?",
              answers:  ["Naruto Uzumaki", "Jiraiya", "Hatake Kakashi", "Orochimaru"],
              correctAnswer: "Naruto Uzumaki",
          },
          { 
              questionNumber: 2,
              questionText: "Who is the Fourth Hokage, in the anime series Naruto?",
              answers:  ["Hiruzen Sarutobi", "Minato Namikaze", "Danzo Shimura", "Tobirama Senju"],
              correctAnswer: "Minato Namikaze",
          },
          { 
              questionNumber: 3,
              questionText: "What village does Naruto Uzumaki belong to?",
              answers:  ["Sunagakure", "Konohagakure", "Amegakure", "Yukigakure"],
              correctAnswer: "Konohagakure",
          },
          { 
              questionNumber: 4,
              questionText: "Who was able to get the rank of chunin, in the first chunin exams?",
              answers:  ["Neji Hyuga", "Naruto Uzumaki", "Sasuke Uchiha", "Shikamaru Nara"],
              correctAnswer: "Shikamaru Nara",
          },
          { 
              questionNumber: 5,
              questionText: "Who is the strongest kunoichi, in the series?",
              answers:  ["Tenten", "Sakura Haruno", "Tsunade Senju", "Kushina Uzumaki"],
              correctAnswer: "Sakura Haruno",
          },
          { 
              questionNumber: 6,
              questionText: "Who killed Danzo Shimura",
              answers:  ["Sasuke Uchiha", "Itachi Uchiha", "Madara Uchiha", "Danzo Shimura"],
              correctAnswer: "Danzo Shimura",
          }
  
      ],
  
      isGameStarted: false,
      wins: 0,
      losses: 0,
      QuestionIndex: 0,
      arrQuestionSize: 0,
      delayHideModal: 0, 
  
      endGame: function() {
          
          $("#triviaQuestion").text("  Game Over, Try again?");
          
          $(".question-number").text("");
          
          $("#periodSpace").text("");
          
          var correctAnswers = "Correct answers: " + triviaGame.wins;
          var incorrectAnswers = "Incorrect answers: " + triviaGame.losses;
          var listItem1 = $("<li>");
          listItem1.addClass("list-group-item");
          listItem1.text(correctAnswers);
          $("#answerList").append(listItem1);
          var listItem2 = $("<li>");
          listItem2.addClass("list-group-item");
          listItem2.text(incorrectAnswers);
          $("#answerList").append(listItem2)
          
          $("#reset").removeClass("invisible");
              
      },
       
      loadQuestionSet: function (element) {
         
        
          $("#answerList").empty();
          
          if ( element < triviaGame.arrQuestionSize ) { 
              if(clockRunning) {
                  stopwatch.stop();
                  stopwatch.start();
              } else {
                  stopwatch.start();
              }
             
              $("#triviaQuestion").text(triviaGame.arrQuestion[element].questionText);
              
              $(".question-number").text(element + 1);
              
              $("#periodSpace").text(". ");
              
              
              var questionAnswers = triviaGame.arrQuestion[element].answers; 
  
              // Append List item answers to the list 
              for(i=0; i < questionAnswers.length; i++ ) {
                  let ListItemQuest = $("<li>");
                  ListItemQuest.addClass("list-group-item");
                  ListItemQuest.text(questionAnswers[i]);
                  
                  $("#answerList").append(ListItemQuest);
              }
          } else {
              
              triviaGame.endGame();
          }
      },
  
      popModal: function( isWin, correctAnswer) {
          if (isWin){
              
              $('#WinModalCenter').modal({ keyboard: false}); 
            
              $(".list-group-item").attr("item-disabled", "t"); 
              
              triviaGame.delayHideModal = setTimeout(function() { 
                  $('#WinModalCenter').modal('hide'); 
                
                  triviaGame.loadQuestionSet(triviaGame.QuestionIndex++);
              }, 5000);
          } else {
              // 
              $("#LossCenterTitle").text("Incorrect!! The correct answer is " + correctAnswer + ".");
              $('#LossModalCenter').modal({ keyboard: false});
            
              $(".list-group-item").attr("item-disabled", "t"); 
              
              triviaGame.delayHideModal = setTimeout(function() { 
                  $('#UnhappyModalCenter').modal('hide'); 
                
                  triviaGame.loadQuestionSet(triviaGame.QuestionIndex++);
              }, 3500);
          } 
          
      },
  
     
      reset: function() {
          triviaGame.wins = 0;
          triviaGame.losses = 0;
           
          triviaGame.arrQuestionSize = Object.keys(triviaGame.arrQuestion).length;
          
          triviaGame.QuestionIndex = 0;
          
          triviaGame.loadQuestionSet(triviaGame.QuestionIndex++); 
          $("#reset").addClass("invisible"); 
      },
  
      
      timeOutPopModal: function( correctAnswer) {
              
              $("#LossModalCenterTitle").text("Time's up!!   The correct answer is " + correctAnswer + ".");
              $('#LossModalCenter').modal('show');
              $(".list-group-item").attr("item-disabled", "t"); 
              triviaGame.delayHide = setTimeout(function() { 
                  $('#LossModalCenter').modal('hide');
                  triviaGame.loadQuestionSet(triviaGame.QuestionIndex++);
              }, 3500);
      },
  
      getCorrectAnswer(){
          var questionNum = parseInt($(".question-number").text(),10);
          questionNum--; 
          return triviaGame.arrQuestion[questionNum].correctAnswer;
      },
   
      processGuess: function(){
         
          var answerSelected = $(this).text();
          var isDisabled = $(this).attr("item-disabled");
          if( typeof isDisabled == 'undefined'){
              stopwatch.stop();
            
              let questionNum = parseInt($(".question-number").text(),10);
              questionNum--; 
              
              if (triviaGame.arrQuestion[questionNum].correctAnswer === answerSelected) {
                  triviaGame.popModal(true);
                  triviaGame.wins++;
    
              } else {
                  triviaGame.popModal(false, triviaGame.arrQuestion[questionNum].correctAnswer);
                  triviaGame.losses++;

              }
  
          }
      }
        
  }
  
  var stopwatch = {
  
      time: 0,
      timeLimit: 25,
  
      start: function() {
    
        if (!clockRunning) {
          stopwatch.time= this.timeLimit;
          intervalId = setInterval(stopwatch.count, 1000);
          clockRunning = true;
        }
      },
      stop: function() {
    
        clearInterval(intervalId);
        clockRunning = false;
      },
      
      count: function() {
    
        stopwatch.time--;
          
        if (stopwatch.time <= 0) {
          stopwatch.stop();
          triviaGame.losses++;
          triviaGame.timeOutPopModal( triviaGame.getCorrectAnswer());  
  
        }

        var converted = stopwatch.timeConverter(stopwatch.time);
        
        $("#display").text(converted);
      },
   
      timeConverter: function(t) {
    
        var minutes = Math.floor(t / 60);
        var seconds = t - (minutes * 60);
    
        if (seconds < 10) {
          seconds = "0" + seconds;
        }
    
        if (minutes === 0) {
          minutes = "00";
        }
        else if (minutes < 10) {
          minutes = "0" + minutes;
        }
    
        return minutes + ":" + seconds;
      }
    };
  
      $("#stop").on("click", stopwatch.stop);
      $("#reset").on("click", triviaGame.reset);
      $(document).on("click", ".list-group-item", triviaGame.processGuess);
  
  }); 
  