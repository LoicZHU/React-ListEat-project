<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;

class UserType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder

            ->addEventListener(FormEvents::PRE_SET_DATA, function (FormEvent $event) {
            // => car fonction anonyme, on doit récupérer ces deux objets via l'event
            // L'event a connaissance de ces deux objets et on peut y accéder
            // On récupère l'entité contenue dans le Form
            $user = $event->getData();
            // On récupère le form
            $form = $event->getForm();

            // Le user est-il nouveau ?
            if ($user->getId() === null) {
                $form->add('password', PasswordType::class, [
                    'empty_data' => '',
                ]);
            } else {
                // Champ non mappé
                $form->add('password', PasswordType::class, [
                    'mapped' => false,
                ]);
            }
        })

            ->add('lastName')
            ->add('firstName')
            ->add('email')       
            ->add('password')
            ->add('role')
            ->add('createdAt',DateType::class, [
                'widget' => 'single_text',
                // this is actually the default format for single_text
                'format' => 'yyyy-MM-dd',
            ])
            
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        //important for no validate front
        $resolver->setDefaults([
            'data_class' => User::class,
            'attr' => [
                'novalidate' => 'novalidate',
            ]
        ]);
    }
}
