<template>
  <div class="welp">
    <welp-header></welp-header>

    <div class="content container"> 
      <div class="column" v-for="post in posts" :key="post.key">
        <div class="card">

          <header class="card-content custom-card-header has-shadow">
            
            <div class="level is-mobile"> 
              <!-- <div class="level-left"> -->
                <div class="level-left">
                  <div class="level-item">
                    <figure class="image is-32x32">
                      <img class="potrait" src="/static/img/icons/chanon.jpeg">
                    </figure>
                  </div>
                  <div class="level-item">
                    <p class="has-text-weight-bold is-size-7">
                      {{ post.author }}  
                      <br />
                      <span class="has-text-weight-light">
                        Posted: {{ post.date }}
                      </span>
                    </p>  
                  </div>
                </div>
                <div class="level-right">
                  <div class="level-item" style="margin: 0">
                    <p class="is-uppercase is-size-7 has-text-weight-light">
                      <span v-if="post.followed">followed</span>
                      <span v-else><a href="">follow</a></span>
                    </p>
                  </div>
                </div>
              </div>
            <!-- </div> -->
          </header>

          <div class="card-content">
            <p class="has-text-weight is-size-7">
              {{ post.title }} 
              <br />
              <span class="has-text-weight-light is-size-8">
                {{ post.desc }}
              </span>
            </p>
            <div class="tags has-text-weight-light is-size-7 columns is-mobile">
              <div class="column">
                <p>
                  <span v-for="tag in post.tags" :key="tag">
                    {{ tag }}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <footer class="card-footer is-size-7 has-text-grey-light">
            <div class="footer-left">
              <span class="footer-item">
                <i class="fas fa-thumbs-up" />
                {{ post.upvotes }}
              </span>
              <span class="footer-item">
                <i class="fas fa-thumbs-down" />
                {{ post.downvotes }}
              </span>
            </div>
            <div class="footer-right has-text-right">
              <span class="footer-item">
                <i class="fas fa-bookmark"></i>
                Add to
              </span>
              <span class="footer-item">
                <i class="fas fa-comments" />
                {{ post.comments }}
              </span>
            </div>
          </footer>

        </div>
      </div>
    </div>    

    <welp-footer></welp-footer>
  </div>
</template>

<script>
import header from './WelpHeader'
import footer from './WelpFooter'

export default {
  data () {
    return {
      posts: [
        {
          id: 0,
          author: 'WelperBoy',
          date: '15/05/2018 16:50',
          followed: true,
          title: 'E-Math \'O\' Level Practice Paper for 2018',
          desc: 'Topics include: Vectors, Statistics & Probability, Graphs, Trigonometry',
          tags: ['E-Math', 'Sec 4', 'Practice', 'Sec 4 Emath'],
          upvotes: '1.2k',
          downvotes: 13,
          comments: 69
        },
        {
          id: 1,
          author: 'SaltedFish',
          date: '15/05/2018 13:10',
          followed: false,
          title: 'English Narrative Model Compositions Sec 4',
          desc: 'Topics include: Home, Environment, Fate, Regrets, Hope, Education, Family, Kindness',
          tags: ['English', 'Sec 3', 'Notes', 'Sec 3 English'],
          upvotes: '1.2k',
          downvotes: 13,
          comments: 69
        }
      ]
    }
  },
  components: {
    'welp-header': header,
    'welp-footer': footer
  }
}
</script>

<style scoped>
.content
{
  padding-top: 50px;
}

.potrait
{
  border-radius: 50%;
}

figure
{
  margin: 0;
}

.custom-card-header
{
  padding-top: 0.7rem;
  padding-bottom: 0.7rem;
  box-shadow: 0 0.5px #CCC;  
}

.card-content
{
  padding-bottom: 0.7rem;
  padding-top: 0.7rem;
}

.tags span
{
  margin-right: 0.6rem;  
  padding: 0.1rem 0.22rem;
  background-color:lightgray;
  color:white;
  border-radius: 5%;
}

.tags .column p
{
  line-height: 1.8rem;
}

/* dsfjdkfjfkdf */

.footer-left .footer-item
{
  margin-right: 0.5rem;
}

.footer-right .footer-item
{
  margin-left: 0.5rem;
}

.footer-left
{
  width: 40%;
}

.footer-right
{
  text-align: right;
  width: 60%;
}

/* ksdfjfksdkjfsdfs */

footer .level-item
{
  min-width: 2rem;
}

footer .level-right
{
  justify-content: flex-end;
}

footer
{
  padding: 1rem 1.5rem;
}

footer i
{
  padding-right: 0.25rem;
}
</style>

